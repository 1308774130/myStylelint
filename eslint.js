/** @format */

const requiredRules = require("./rules/eslint/required");
const recommendedRules = require("./rules/eslint/recommended");
const optionalRules = require("./rules/eslint/optional");

module.exports = {
  parser: "@typescript-eslint/parser",

  // 定义代码运行环境Í
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },

  // 解析器选项
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json"],
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],

  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier", "import"],

  rules: {
    // 合并原有规则
    ...requiredRules,
    ...recommendedRules,
    ...optionalRules,
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  globals: {
    __DEV__: "readonly",
    Promise: "readonly",
    Proxy: "readonly",
    __NEXT_DATA__: "readonly",
    window: "readonly",
    I18nOnlineAccountSDK: "readonly",
    API: "readonly",
  },
};
