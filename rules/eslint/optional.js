// 可选的规则
module.exports = {
  // 允许使用非空断言操作符
  "@typescript-eslint/no-non-null-assertion": "warn",

  // 允许空接口
  "@typescript-eslint/no-empty-interface": "off",

  // 允许 JSX 中不导入 React
  "react/react-in-jsx-scope": "off",

  "react/prop-types": "off", // 关闭 props 类型检查
  "react/no-unescaped-entities": "off", // 允许非转义字符
  "@typescript-eslint/interface-name-prefix": "off", // 允许接口名称前缀
  "@typescript-eslint/ban-ts-ignore": "warn", // 警告使用 @ts-ignore
  "@typescript-eslint/camelcase": "off", // 允许非驼峰命名
  "@typescript-eslint/naming-convention": "off", // 替代 camelcase 规则
  "@typescript-eslint/ban-ts-comment": "warn", // 替代 ban-ts-ignore 规则
  "@typescript-eslint/no-inferrable-types": "warn", // 警告不必要的类型声明
  "no-unsafe-finally": "warn", // 警告 finally 中的不安全代码
  "no-console": "off", // 允许使用 console
  "arrow-body-style": "off", // 允许箭头函数体使用大括号
  "prefer-arrow-callback": "off", // 允许使用普通函数作为回调
  "prettier/prettier": "error", // 强制使用 Prettier 格式化
};
