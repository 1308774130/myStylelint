module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // commit 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档修改
        'style',    // 代码格式修改，注意不是 css 修改
        'refactor', // 代码重构
        'perf',     // 优化相关，比如提升性能、体验
        'test',     // 测试用例修改
        'chore',    // 其他修改, 比如改变构建流程、或者增加依赖库、工具等
        'revert',   // 回滚到上一个版本
        'build',    // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
      ],
    ],
    // <type> 格式 小写
    'type-case': [2, 'always', 'lower-case'],
    // <type> 不能为空
    'type-empty': [2, 'never'],
    // <scope> 范围不能为空
    'scope-empty': [0, 'never'],
    // <scope> 范围格式
    'scope-case': [0],
    // <subject> 主要 message 不能为空
    'subject-empty': [2, 'never'],
    // <subject> 以什么为结束标志，禁用
    'subject-full-stop': [0, 'never'],
    // <subject> 格式，禁用
    'subject-case': [0, 'never'],
    // <body> 以空行开头
    'body-leading-blank': [1, 'always'],
    'header-max-length': [0, 'always', 72],
  },
}; 