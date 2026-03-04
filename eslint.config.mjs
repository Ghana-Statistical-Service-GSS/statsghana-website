import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Plain-text reference file, not JavaScript
    "app/lib/statsbank.js",
  ]),
  {
    rules: {
      // Downgrade to warnings — these are type-strictness issues, not bugs.
      // Address them incrementally post-launch.
      "@typescript-eslint/no-explicit-any": "warn",
      // Resetting state on prop change via useEffect is an accepted React pattern.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
