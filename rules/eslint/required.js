// 必须遵守的核心规则
module.exports = {
  // 禁止定义未使用的变量
  "no-unused-vars": "error",

  // 禁止使用未声明的变量
  "no-undef": "error",

  // 禁止重复导入模块
  "no-duplicate-imports": "error",

  // 强制模块导入的顺序
  "import/order": [
    "error",
    {
      groups: [
        "external", // 外部模块
        "builtin", // 内置模块
        "internal", // 内部模块
        "parent", // 父级目录
        "sibling", // 同级目录
        "index", // index文件
      ],
      "newlines-between": "never", // 组之间不需要空行
    },
  ],
  "import/newline-after-import": ["error", { count: 1 }],

  // 禁止使用 any 类型
  "@typescript-eslint/no-explicit-any": "error",

  // 禁止定义未使用的变量（TypeScript版本）
  "@typescript-eslint/no-unused-vars": "error",

  // 强制 hooks 规则
  "react-hooks/rules-of-hooks": "error",
  "react/no-string-refs": "warn", // 警告使用字符串 refs
  "@typescript-eslint/no-use-before-define": "error", // 不允许在定义前使用
  "@typescript-eslint/no-empty-function": "error", // 不允许空函数
  "dot-notation": "error",
  "no-useless-escape": "error", // 不允许不必要的转义
  "prefer-const": "error", // 不允许使用 let 声明不会被修改的变量
};
