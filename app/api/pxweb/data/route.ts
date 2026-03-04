import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/app/lib/rateLimit";

export async function POST(request: Request) {
  const rateLimit = enforceRateLimit(request, {
    key: "api:pxweb:data",
    limit: 60,
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
  const cacheSeconds = Number(searchParams.get("cacheSeconds") ?? 0);

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

  const body = await request.json();
  // Force legacy PxWeb JSON format to match statsbank.js usage ({ columns, data })
  const proxyBody = {
    ...body,
    response: {
      ...(body?.response ?? {}),
      format: "json",
    },
  };
  const url = `${baseUrl.replace(/\/$/, "")}/${matrix}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proxyBody),
    ...(cacheSeconds > 0
      ? { next: { revalidate: cacheSeconds } }
      : { cache: "no-store" }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    console.error("[pxweb/data] failed", {
      matrix,
      status: response.status,
      url,
      errorBody: errorBody.slice(0, 500),
    });
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to fetch data",
        status: response.status,
        details: errorBody ? errorBody.slice(0, 500) : undefined,
      },
      { status: response.status, headers: rateLimit.headers },
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { headers: rateLimit.headers });
}
