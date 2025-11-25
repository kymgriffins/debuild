const eslintConfig = [
  {
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Modern TypeScript rules for 2025
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      // React modern rules
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "warn", // Allow but warn for React 19 migration
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/self-closing-comp": "error",

      // General code quality for 2025 standards
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "build/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "copy-images.js",
      "scripts/**"
    ],
  },
];

export default eslintConfig;
