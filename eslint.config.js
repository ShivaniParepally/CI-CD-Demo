export default [
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "prefer-const": "error"
    },
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly"
      }
    }
  }
];
