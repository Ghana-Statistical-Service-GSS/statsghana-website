import { NextResponse } from "next/server";
import { getGssMediaVideos } from "@/app/lib/youtubeVideos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getGssMediaVideos();
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch media videos";
    return NextResponse.json({ ok: false, error: message, items: [] }, { status: 500 });
  }
}
