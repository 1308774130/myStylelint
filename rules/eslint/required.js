// 必须遵守的核心规则
module.exports = {
  // 禁止定义未使用的变量
  'no-unused-vars': 'error',
  
  // 禁止使用未声明的变量
  'no-undef': 'error',
  
  // 禁止重复导入模块
  'no-duplicate-imports': 'error',
  
  // 强制模块导入的顺序
  'import/order': [
    'error',
    {
      groups: [
        'builtin',    // 内置模块
        'external',   // 外部模块
        'internal',   // 内部模块
        'parent',     // 父级目录
        'sibling',    // 同级目录
        'index',      // index文件
      ],
      'newlines-between': 'always', // 不同组之间空一行
    },
  ],
  
  // 禁止使用 any 类型
  '@typescript-eslint/no-explicit-any': 'error',
  
  // 禁止定义未使用的变量（TypeScript版本）
  '@typescript-eslint/no-unused-vars': 'error',
  
  // 强制组件的 props 进行类型检查
  'react/prop-types': 'error',
  
  // 强制 hooks 规则
  'react-hooks/rules-of-hooks': 'error',
}; 