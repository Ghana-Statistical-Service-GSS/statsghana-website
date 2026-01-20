import { NextResponse } from "next/server";
import { bucketName, listObjects } from "@/app/lib/minio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";

  try {
    const objects = await listObjects(prefix);
    const sampleKeys = objects
      .map((item) => item.key)
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json({
      ok: true,
      bucket: bucketName,
      endpoint: process.env.MINIO_ENDPOINT,
      canList: true,
      sampleKeys,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to list objects";
    return NextResponse.json(
      {
        ok: false,
        bucket: bucketName,
        endpoint: process.env.MINIO_ENDPOINT,
        canList: false,
        error: message,
        sampleKeys: [],
      },
      { status: 500 },
    );
  }
}
