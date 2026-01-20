import { NextResponse } from "next/server";
import { listObjects } from "@/app/lib/minio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";

  try {
    const items = await listObjects(prefix);
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to list objects";
    return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
  }
}
