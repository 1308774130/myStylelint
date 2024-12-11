// 可选的 Prettier 规则
module.exports = {
  // 对象的属性名仅在必要时使用引号
  quoteProps: "as-needed",

  // JSX标签的'>'放在最后一行的末尾
  jsxBracketSameLine: true,

  // 不需要特殊注释即可格式化
  requirePragma: false,

  // 不自动插入@format标记
  insertPragma: false,

  // 按原样包装markdown文本
  proseWrap: "preserve",

  // 忽略HTML空白敏感度
  htmlWhitespaceSensitivity: "ignore",

  // 不缩进Vue文件中的脚本和样式标签
  vueIndentScriptAndStyle: false,

  // 自动检测并格式化内嵌的代码块
  embeddedLanguageFormatting: "auto",
};
