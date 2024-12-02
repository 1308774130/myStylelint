// 建议遵守的规则
module.exports = {
  // 警告使用 console
  'no-console': ['warn', { 
    allow: ['warn', 'error'] // 允许使用 console.warn 和 console.error
  }],
  
  // 建议函数显式声明返回类型
  '@typescript-eslint/explicit-function-return-type': 'warn',
  
  // 建议模块导出的函数和类的类型显式声明
  '@typescript-eslint/explicit-module-boundary-types': 'warn',
  
  // 警告使用不带 rel="noreferrer" 的 target="_blank"
  'react/jsx-no-target-blank': 'warn',
  
  // 警告 useEffect 的依赖项设置
  'react-hooks/exhaustive-deps': 'warn',
}; 