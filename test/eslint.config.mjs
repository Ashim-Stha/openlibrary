import js from "@eslint/js";
import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["./node_modules/*", "./test-results/*", "./playwright-report/*"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}", "./*.{js,mjs,cjs,ts}"],
    plugins: { js, stylisticJs },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}", "./*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    rules: {
      semi: "error",
    },
  },
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/block-spacing": "error",
      "@stylistic/js/arrow-spacing": "error",
      "@stylistic/js/comma-spacing": "error",
    },
  },
]);
