import "server-only";

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  dateISO: string;
  eventId: string;
  eventTitle: string;
  type: "youtube" | "tiktok" | "file";
  youtubeId?: string;
  videoUrl?: string;
  thumbnail?: string;
};

const GSS_YOUTUBE_HANDLE_URL = "https://www.youtube.com/@ghanastatisticalservice";
const YOUTUBE_EVENT_ID = "gss-youtube-channel";
const YOUTUBE_EVENT_TITLE = "GSS YouTube Channel";
const GSS_TIKTOK_PROFILE_URL = "https://www.tiktok.com/@stats_ghana";
const TIKTOK_EVENT_ID = "gss-tiktok-channel";
const TIKTOK_EVENT_TITLE = "GSS TikTok Channel";

const decodeXml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const extractTag = (entry: string, tag: string) => {
  const match = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? "";
};

const toSafeDate = (value: string | number | null | undefined) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value * 1000).toISOString();
  }
  if (typeof value === "string" && value.trim()) {
    const time = Date.parse(value);
    if (Number.isFinite(time)) {
      return new Date(time).toISOString();
    }
  }
  return new Date(0).toISOString();
};

const getString = (value: unknown) =>
  typeof value === "string" ? value : "";

const getNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;

const parseFeed = (xml: string): VideoItem[] => {
  const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g));
  const videos: VideoItem[] = [];

  for (const [index, entry] of entries.entries()) {
    const body = entry[1];
    const videoId = extractTag(body, "yt:videoId");
    const title = decodeXml(extractTag(body, "title"));
    const published = extractTag(body, "published");
    const rawDescription = decodeXml(extractTag(body, "media:description"));
    const description = rawDescription
      ? rawDescription.slice(0, 220)
      : "Watch this video on the Ghana Statistical Service YouTube channel.";

    if (!videoId || !title || !published) {
      continue;
    }

    videos.push({
      id: `youtube-${videoId}-${index + 1}`,
      title,
      description,
      dateISO: toSafeDate(published),
      eventId: YOUTUBE_EVENT_ID,
      eventTitle: YOUTUBE_EVENT_TITLE,
      type: "youtube",
      youtubeId: videoId,
    });
  }

  return videos;
};

const extractChannelId = (html: string): string | null => {
  const externalIdMatch = html.match(/"externalId":"(UC[^"]+)"/);
  if (externalIdMatch?.[1]) return externalIdMatch[1];

  const channelIdMatch = html.match(/"channelId":"(UC[^"]+)"/);
  if (channelIdMatch?.[1]) return channelIdMatch[1];

  const browseIdMatch = html.match(/"browseId":"(UC[^"]+)"/);
  if (browseIdMatch?.[1]) return browseIdMatch[1];

  return null;
};

const extractJsonFromScript = (html: string, scriptId: string) => {
  const escapedId = scriptId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const scriptMatch = html.match(
    new RegExp(
      `<script[^>]*id=["']${escapedId}["'][^>]*>([\\s\\S]*?)<\\/script>`,
      "i",
    ),
  );

  if (!scriptMatch?.[1]) return null;

  try {
    return JSON.parse(scriptMatch[1]) as unknown;
  } catch {
    return null;
  }
};

const findObjectContainingKey = (
  value: unknown,
  key: string,
): Record<string, unknown> | null => {
  const current = asRecord(value);
  if (current) {
    if (Object.prototype.hasOwnProperty.call(current, key)) {
      return current;
    }

    for (const child of Object.values(current)) {
      const found = findObjectContainingKey(child, key);
      if (found) return found;
    }
  }

  if (Array.isArray(value)) {
    for (const child of value) {
      const found = findObjectContainingKey(child, key);
      if (found) return found;
    }
  }

  return null;
};

const parseTikTokVideosFromState = (state: unknown): VideoItem[] => {
  const parentWithItems = findObjectContainingKey(state, "ItemModule");
  const itemModule = asRecord(parentWithItems?.ItemModule);
  if (!itemModule) return [];
  const videos: VideoItem[] = [];

  for (const [index, item] of Object.values(itemModule).entries()) {
    const row = asRecord(item);
    if (!row) continue;

    const id = getString(row.id || row.itemId);
    if (!id) continue;

    const desc = getString(row.desc).trim();
    const title = desc || `TikTok video ${index + 1}`;
    const video = asRecord(row.video);
    const author = asRecord(row.author);
    const authorUniqueId = getString(author?.uniqueId).trim() || "stats_ghana";

    const cover =
      getString(video?.cover).trim() ||
      getString(video?.dynamicCover).trim() ||
      getString(video?.originCover).trim();

    const createdAt =
      getNumber(row.createTime) ??
      getNumber(row.create_time) ??
      getNumber(row.timestamp);

    videos.push({
      id: `tiktok-${id}-${index + 1}`,
      title,
      description:
        desc ||
        "Watch this video on the official Ghana Statistical Service TikTok account.",
      dateISO: toSafeDate(createdAt),
      eventId: TIKTOK_EVENT_ID,
      eventTitle: TIKTOK_EVENT_TITLE,
      type: "tiktok",
      videoUrl: `https://www.tiktok.com/@${authorUniqueId}/video/${id}`,
      thumbnail: cover || undefined,
    });
  }

  return videos;
};

const fallbackTikTokCard = (): VideoItem => ({
  id: "tiktok-profile-stats-ghana",
  title: "@stats_ghana TikTok",
  description:
    "Visit the official Ghana Statistical Service TikTok account for short videos and updates.",
  dateISO: new Date(0).toISOString(),
  eventId: TIKTOK_EVENT_ID,
  eventTitle: TIKTOK_EVENT_TITLE,
  type: "tiktok",
  videoUrl: GSS_TIKTOK_PROFILE_URL,
  thumbnail: "/images/placeholder.png",
});

export async function getGssTikTokVideos(): Promise<VideoItem[]> {
  try {
    const response = await fetch(GSS_TIKTOK_PROFILE_URL, {
      next: { revalidate: 900 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      return [fallbackTikTokCard()];
    }

    const html = await response.text();
    const universalState = extractJsonFromScript(
      html,
      "__UNIVERSAL_DATA_FOR_REHYDRATION__",
    );
    const sigiState = extractJsonFromScript(html, "SIGI_STATE");

    const universalVideos = parseTikTokVideosFromState(universalState);
    if (universalVideos.length) return universalVideos;

    const sigiVideos = parseTikTokVideosFromState(sigiState);
    if (sigiVideos.length) return sigiVideos;

    return [fallbackTikTokCard()];
  } catch {
    return [fallbackTikTokCard()];
  }
}

const fetchFeedByChannelId = async (channelId: string): Promise<VideoItem[]> => {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const response = await fetch(feedUrl, {
    next: { revalidate: 900 },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch YouTube feed (${response.status})`);
  }

  const xml = await response.text();
  return parseFeed(xml);
};

export async function getGssYoutubeVideos(): Promise<VideoItem[]> {
  try {
    const handleResponse = await fetch(GSS_YOUTUBE_HANDLE_URL, {
      next: { revalidate: 900 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
      },
    });

    if (!handleResponse.ok) {
      throw new Error(`Unable to fetch YouTube handle page (${handleResponse.status})`);
    }

    const html = await handleResponse.text();
    const channelId = extractChannelId(html);
    if (!channelId) {
      throw new Error("Unable to resolve YouTube channel ID from handle page");
    }

    return await fetchFeedByChannelId(channelId);
  } catch {
    return [];
  }
}

export async function getGssMediaVideos(): Promise<VideoItem[]> {
  const [youtube, tiktok] = await Promise.all([
    getGssYoutubeVideos(),
    getGssTikTokVideos(),
  ]);

  return [...youtube, ...tiktok].sort((a, b) => {
    const aTime = Date.parse(a.dateISO);
    const bTime = Date.parse(b.dateISO);
    const safeATime = Number.isFinite(aTime) ? aTime : 0;
    const safeBTime = Number.isFinite(bTime) ? bTime : 0;
    return safeBTime - safeATime;
  });
}
