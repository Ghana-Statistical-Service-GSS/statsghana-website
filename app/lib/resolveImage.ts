import { slugify } from "./slugify";

const EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

export function titleToImageCandidates(title: string): string[] {
  const base = slugify(title);
  const variants = new Set<string>([base]);

  if (base.includes("-")) {
    variants.add(base.replace(/-/g, "_"));
    variants.add(base.replace(/-/g, ""));
  }

  const candidates: string[] = [];
  variants.forEach((variant) => {
    EXTENSIONS.forEach((ext) => {
      candidates.push(`/images/${variant}.${ext}`);
    });
  });

  return candidates;
}
