import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    ignores: ["**/*.config.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      indent: ["warning", 2],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],

      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
        },
      ],
    },
  },
];
