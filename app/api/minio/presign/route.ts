import { NextResponse } from "next/server";
import { presignGetUrl } from "@/app/lib/minio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const expiresParam = searchParams.get("expires");

  if (!key) {
    return NextResponse.json(
      { error: "Missing required query param: key" },
      { status: 400 },
    );
  }

  const expiresIn = expiresParam ? Number(expiresParam) : 600;
  const safeExpires = Number.isFinite(expiresIn) ? expiresIn : 600;

  try {
    const url = await presignGetUrl(key, safeExpires);
    return NextResponse.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create presigned URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
