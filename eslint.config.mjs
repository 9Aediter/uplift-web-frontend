import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ใช้ Next.js Style Guide (เหมาะกับ Next.js 15 + App Router + TypeScript)
const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",  // Next.js Core Web Vitals rules
    "next/typescript"        // Next.js TypeScript rules
  ),
  {
    rules: {
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',

      // React best practices
      'react/jsx-no-target-blank': 'error',
      'react/self-closing-comp': 'warn',

      // Next.js specific (already included but explicitly listed for clarity)
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',
    }
  }
];

export default eslintConfig;
