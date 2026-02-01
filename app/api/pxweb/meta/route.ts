import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matrix = searchParams.get("matrix");
  const baseUrl = process.env.PXWEB_BASE_URL;

  if (!matrix) {
    return NextResponse.json({ ok: false, error: "Missing matrix" }, { status: 400 });
  }
  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, error: "PXWEB_BASE_URL is not configured" },
      { status: 500 },
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
      { status: response.status },
    );
  }

  const data = await response.json();

  // Log metadata the right way (variables)
  console.log("[pxweb/meta] ok", {
    matrix,
    url,
    variableCount: Array.isArray((data as any)?.variables) ? (data as any).variables.length : 0,
    variableCodes: Array.isArray((data as any)?.variables)
      ? (data as any).variables.map((v: any) => v.code)
      : [],
  });

  return NextResponse.json(data);
}
