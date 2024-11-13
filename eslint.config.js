import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginImport from "eslint-plugin-import";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },
  includeIgnoreFile(gitignorePath),
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },
  skipFormatting,
  {
    plugins: {
      import: pluginImport,
      "unused-imports": pluginUnusedImports,
      tailwindcss: pluginTailwindcss,
    },
  },
  {
    rules: {
      "no-console": "warn",
      "vue/no-ref-as-operand": "error",
      "vue/multi-word-component-names": "warn",

      // unused-imports
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "tailwindcss/no-custom-classname": [
        "warn",
        {
          whitelist: ["_.*"],
        },
      ],
    },
  },
];
