const EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx", "zip", "ppt", "pptx"];
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export function isAllowedFile(key: string) {
  const lower = key.toLowerCase();
  return EXTENSIONS.some((ext) => lower.endsWith(`.${ext}`));
}

export function isImageFile(key: string) {
  const lower = key.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(`.${ext}`));
}

export function stripExtension(name: string) {
  return name.replace(/\.[a-z0-9]+$/i, "");
}

export function normalizeName(value: string) {
  return stripExtension(value)
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractKey(item: Record<string, unknown>) {
  return (
    (item.key as string) ||
    (item.name as string) ||
    (item.objectName as string) ||
    (item.Key as string) ||
    ""
  );
}

export function extractBaseName(key: string) {
  const parts = key.split("/");
  return parts[parts.length - 1] || key;
}

export function buildKeyIndex(keys: string[]) {
  const entries = keys.map((key) => {
    const base = extractBaseName(key);
    return { key, base, norm: normalizeName(base) };
  });

  const map = new Map<string, string>();
  for (const entry of entries) {
    if (!map.has(entry.norm)) {
      map.set(entry.norm, entry.key);
    }
  }

  return { entries, map };
}

export function matchKeyForReport(
  title: string,
  fallbackId: string,
  index: { entries: Array<{ key: string; norm: string }>; map: Map<string, string> }
) {
  const normalizedTitle = normalizeName(title || "");
  if (normalizedTitle && index.map.has(normalizedTitle)) {
    return index.map.get(normalizedTitle) ?? null;
  }

  const normalizedId = normalizeName(fallbackId || "");
  if (normalizedId && index.map.has(normalizedId)) {
    return index.map.get(normalizedId) ?? null;
  }

  const candidates = index.entries.filter((entry) => {
    if (!normalizedTitle) return false;
    return entry.norm.includes(normalizedTitle) || normalizedTitle.includes(entry.norm);
  });

  if (!candidates.length) return null;

  candidates.sort((a, b) => a.norm.length - b.norm.length);
  return candidates[0]?.key ?? null;
}
