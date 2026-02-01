import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const matrix = searchParams.get("matrix");
  const baseUrl = process.env.PXWEB_BASE_URL;
  const cacheSeconds = Number(searchParams.get("cacheSeconds") ?? 0);

  if (!matrix) {
    return NextResponse.json(
      { ok: false, error: "Missing matrix" },
      { status: 400 },
    );
  }

  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, error: "PXWEB_BASE_URL is not configured" },
      { status: 500 },
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
      { status: response.status },
    );
  }

  const data = await response.json();
  console.log("[pxweb/data] ok", {
    matrix,
    url,
    columns: Array.isArray(data?.columns) ? data.columns.map((c: any) => c.code) : [],
    dataCount: Array.isArray(data?.data) ? data.data.length : 0,
    sampleRows: Array.isArray(data?.data) ? data.data.slice(0, 3) : [],
  });
  return NextResponse.json(data);
}
