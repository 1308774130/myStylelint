// 建议遵守的规则
module.exports = {
  // 建议函数显式声明返回类型，但有一些智能例外
  "@typescript-eslint/explicit-function-return-type": [
    "warn",
    {
      // 允许表达式的返回类型被推导
      allowExpressions: true,

      // 允许箭头函数的返回类型被推导
      allowTypedFunctionExpressions: true,

      // 允许直接返回值的箭头函数省略返回类型
      allowDirectConstAssertionInArrowFunctions: true,

      // 允许高阶函数的返回类型被推导
      allowHigherOrderFunctions: true,

      // 允许使用 as const 断言的函数
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
    },
  ],

  "@typescript-eslint/explicit-module-boundary-types": [
    "warn",
    {
      allowArgumentsExplicitlyTypedAsAny: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowHigherOrderFunctions: true,
      allowTypedFunctionExpressions: true,
    },
  ],

  // 警告使用不带 rel="noreferrer" 的 target="_blank"
  "react/jsx-no-target-blank": "warn",

  // 警告 useEffect 的依赖项设置
  "react-hooks/exhaustive-deps": "warn",

  "react/display-name": "warn", // 警告组件没有 display name
};
