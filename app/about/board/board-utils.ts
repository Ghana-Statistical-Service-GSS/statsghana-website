import { BoardMember } from "./board-data";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sortBoardMembers(members: BoardMember[]): BoardMember[] {
  return [...members].sort((a, b) => {
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();
    const aIsChair = a.role === "Board Chair";
    const bIsChair = b.role === "Board Chair";
    const aIsAlhassan = aLower.includes("alhassan iddrisu");
    const bIsAlhassan = bLower.includes("alhassan iddrisu");
    const aIsKwadwo = aLower.includes("kwadwo asante");
    const bIsKwadwo = bLower.includes("kwadwo asante");

    if (aIsChair && !bIsChair) return -1;
    if (!aIsChair && bIsChair) return 1;
    if (aIsAlhassan && !bIsAlhassan) return -1;
    if (!aIsAlhassan && bIsAlhassan) return 1;
    if (aIsKwadwo && !bIsKwadwo) return 1;
    if (!aIsKwadwo && bIsKwadwo) return -1;
    return a.name.localeCompare(b.name);
  });
}
