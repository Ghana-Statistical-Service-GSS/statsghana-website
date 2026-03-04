import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/app/lib/rateLimit";

export async function GET(request: Request) {
  const rateLimit = enforceRateLimit(request, {
    key: "api:pxweb:meta",
    limit: 120,
    windowMs: 60_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: rateLimit.headers },
    );
  }

  const { searchParams } = new URL(request.url);
  const matrix = searchParams.get("matrix");
  const baseUrl = process.env.PXWEB_BASE_URL;

  if (!matrix) {
    return NextResponse.json(
      { ok: false, error: "Missing matrix" },
      { status: 400, headers: rateLimit.headers },
    );
  }
  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, error: "PXWEB_BASE_URL is not configured" },
      { status: 500, headers: rateLimit.headers },
    );
  }

  // GET is for PxWeb metadata (variables)
  const url = `${baseUrl.replace(/\/$/, "")}/${matrix}`;
  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("[pxweb/meta] failed", { matrix, status: response.status, url, text });
    return NextResponse.json(
      { ok: false, error: `Failed to fetch metadata (${response.status})`, details: text },
      { status: response.status, headers: rateLimit.headers },
    );
  }

  const data = await response.json();

  return NextResponse.json(data, { headers: rateLimit.headers });
}
