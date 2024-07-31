module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["unused-imports", "simple-import-sort", "jest"],
  parser: "@typescript-eslint/parser",

  rules: {
    // https://github.com/sweepline/eslint-plugin-unused-imports
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
};
