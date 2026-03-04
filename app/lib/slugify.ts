type SlugifyOptions = {
  removeParenthesesContent?: boolean;
};

export function slugify(value: string, options: SlugifyOptions = {}) {
  const { removeParenthesesContent = true } = options;

  let normalized = value.toLowerCase().trim();

  if (removeParenthesesContent) {
    normalized = normalized.replace(/\([^)]*\)/g, "");
  }

  return normalized
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
