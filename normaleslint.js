/** @format */

// 这是一个 ESLint 配置文件,用于定义代码检查规则

module.exports = {

  // 定义代码运行环境
  env: {
    browser: true,     // 支持浏览器环境
    node: true,        // 支持 Node.js 环境
    es2021: true,      // 支持 ES2021 特性
    jest: true,        // 支持 Jest 测试环境
  },

  // 使用 TypeScript parser 进行解析
  parser: '@typescript-eslint/parser',

  // 继承推荐的规则集
  extends: [
    'eslint:recommended',           // ESLint 推荐规则
    'plugin:prettier/recommended',  // Prettier 推荐规则
  ],

  // 启用的插件
  plugins: [
    'react',                // React 相关规则
    'react-hooks',         // React Hooks 规则
    '@typescript-eslint',  // TypeScript 规则
    'prettier',            // Prettier 规则
  ],

  // React 相关设置
  settings: {
    react: {
      version: 'detect',  // 自动检测 React 版本
    },
  },

  // 解析器选项
  parserOptions: {
    ecmaVersion: 2019,    // 使用的 ECMAScript 版本
    sourceType: 'module', // 使用 ES 模块
    ecmaFeatures: {
      jsx: true,          // 支持 JSX
    },
    project: ['./tsconfig.json'], // TypeScript 配置文件位置
  },

  // 具体规则配置
  rules: {
    // TypeScript 相关规则
    '@typescript-eslint/explicit-function-return-type': 'off',  // 关闭函数返回类型必须明确声明
    '@typescript-eslint/no-use-before-define': 'off',          // 允许在定义前使用
    '@typescript-eslint/no-unused-vars': 'error',              // 禁止未使用的变量
    '@typescript-eslint/interface-name-prefix': 'off',         // 允许接口名称前缀
    '@typescript-eslint/no-empty-interface': 'off',            // 允许空接口
    '@typescript-eslint/ban-ts-ignore': 'warn',               // 警告使用 @ts-ignore
    '@typescript-eslint/camelcase': 'off',                    // 允许非驼峰命名
    '@typescript-eslint/no-explicit-any': 'off',              // 允许使用 any
    '@typescript-eslint/no-empty-function': 'off',            // 允许空函数

    // React 相关规则
    'react/no-string-refs': 'warn',           // 警告使用字符串 refs
    'react/display-name': 'warn',             // 警告组件没有 display name
    'react/prop-types': 'off',                // 关闭 props 类型检查
    'react/no-unescaped-entities': 'off',     // 允许非转义字符

    // 其他规则
    'no-useless-escape': 'off',               // 允许不必要的转义
    'no-unsafe-finally': 'warn',              // 警告 finally 中的不安全代码
    'prefer-const': 'off',                    // 允许使用 let 声明不会被修改的变量
    'no-console': 'off',                      // 允许使用 console
    'arrow-body-style': 'off',                // 允许箭头函数体使用大括号
    'prefer-arrow-callback': 'off',           // 允许使用普通函数作为回调
    'prettier/prettier': 'error',             // 强制使用 Prettier 格式化
  },

  // 全局变量定义
  globals: {
    __DEV__: 'readonly',              // 开发环境标记
    Promise: 'readonly',              // Promise 对象
    Proxy: 'readonly',                // Proxy 对象
    __NEXT_DATA__: 'readonly',        // Next.js 数据
    window: 'readonly',               // 浏览器 window 对象
    I18nOnlineAccountSDK: 'readonly', // 国际化 SDK
    API: 'readonly',                  // API 对象
  },
}