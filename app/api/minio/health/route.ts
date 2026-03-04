import { NextResponse } from "next/server";
import { bucketName, listObjects } from "@/app/lib/minio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";

  try {
    await listObjects(prefix);

    return NextResponse.json({
      ok: true,
      bucket: bucketName,
      canList: true,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to list objects";
    return NextResponse.json(
      {
        ok: false,
        bucket: bucketName,
        canList: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
