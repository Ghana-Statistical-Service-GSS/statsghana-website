export type ParsedPerson = {
  name: string;
  isChair: boolean;
  role: "Board Chair" | "Board Member" | "Board Secretary" | "Ex-Officio Member";
};

export type BoardItem = ParsedPerson & {
  key: string;
  url: string;
};

export function isImageKey(key: string): boolean {
  return /\.(jpe?g|png|webp)$/i.test(key);
}

export function parsePersonFromFilename(keyOrFilename: string): ParsedPerson {
  const base = keyOrFilename.split("/").pop() ?? keyOrFilename;
  const decoded = decodeURIComponent(base);
  const withoutExt = decoded.replace(/\.[^.]+$/, "");
  const isChair = /board\s*chair/i.test(withoutExt);
  const cleaned = withoutExt
    .replace(/\(.*board\s*chair.*\)/i, "")
    .replace(/board\s*chair/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const lower = cleaned.toLowerCase();
  let role: ParsedPerson["role"] = isChair ? "Board Chair" : "Board Member";

  if (lower.includes("kwadwo asante")) {
    role = "Board Secretary";
  }
  if (lower.includes("alhassan iddrisu")) {
    role = "Ex-Officio Member";
  }

  return { name: cleaned, isChair, role };
}

export function sortBoardMembers(items: BoardItem[]): BoardItem[] {
  return [...items].sort((a, b) => {
    if (a.isChair && !b.isChair) return -1;
    if (!a.isChair && b.isChair) return 1;
    return a.name.localeCompare(b.name);
  });
}
