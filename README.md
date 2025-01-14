# @ctrip/eslint-config-cruise

团队统一的代码规范工具集，包含 ESLint、Prettier 和 Git Commit 规范配置。

## 📋 功能特性

- ✨ ESLint 配置：代码质量检查和最佳实践
- 🎨 Prettier 配置：统一的代码格式化规则
- 📝 Commit 规范：标准化的 Git 提交信息
- 🔧 模块化的规则配置：required、recommended、optional 三个级别
- 🚀 即插即用：最小化配置即可使用
- 🛠 完整的 TypeScript 支持
- ⚛️ React/JSX 规则支持

## 🎯 项目目标

- 统一团队代码风格，提高代码可读性
- 减少代码审查中关于格式的讨论
- 降低项目维护成本
- 提升团队开发效率
- 减少潜在 bug
- 规范化 Git 提交记录

## 📦 安装

```bash
# 使用 npm
npm install --save-dev @ctrip/eslint-config-cruise

# 使用 yarn
yarn add -D @ctrip/eslint-config-cruise
```

## 🔧 使用方法

### 快速设置

```bash
# 安装依赖
npm install --save-dev @ctrip/eslint-config-cruise

# 运行自动设置脚本
npx setup-lint-config
```

这个脚本会自动：

- 安装并配置 husky
- 设置 Git hooks
- 配置 lint-staged
- 更新 package.json

### 手动设置

### ESLint 配置

在项目根目录创建 `.eslintrc.js`：

```javascript
module.exports = {
  extends: ["@ctrip/eslint-config-cruise "],
  rules: {
    // 自定义规则（可选）
  },
};
```

### Prettier 配置

在项目根目录创建 `.prettierrc.js`：

```javascript
module.exports = require("@ctrip/eslint-config-cruise /prettier");
```

### Git Commit 规范

1. 安装必要依赖：

```bash
npm install --save-dev @commitlint/cli husky
```

2. 创建 `commitlint.config.js`：

```javascript
module.exports = require("@ctrip/eslint-config-cruise /commitlint");
```

3. 配置 husky：

```bash
# 初始化 husky
npx husky install

# 添加 commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

4. 在 package.json 中添加：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 📝 规则说明

### ESLint 规则级别

1. **Required (必须的)**

- 代码质量相关的强制规则
- 可能导致错误的实践
- TypeScript 类型检查规则

2. **Recommended (推荐的)**

- 代码风格建议
- 最佳实践指导
- 性能优化建议

3. **Optional (可选的)**

- 灵活的编码风格规则
- 特定场景的规则
- 可由团队自行决定的规则

### Prettier 配置

主要格式化规则包括：

- 行宽限制：80 字符
- 使用单引号
- 使用 2 空格缩进
- 句末使用分号
- 对象属性使用尾随逗号
- JSX 使用单引号

### Commit 消息格式

```bash
type(scope?): subject

[optional body]

[optional footer(s)]
```

#### 类型说明

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链/依赖更新
- `revert`: 回滚提交
- `build`: 构建相关

## 🌟 预期收益

### 团队层面

- 统一的代码风格提升团队协作效率
- 减少代码审查时间
- 降低沟通成本
- 提高代码质量

### 开发层面

- 自动化的代码格式化
- 即时的错误提示
- 规范的提交信息
- 更好的开发体验

### 项目层面

- 提高代码可维护性
- 减少潜在 bug
- 便于新成员快速接入
- 提升项目质量

## 💡 最佳实践

1. **编辑器配置**

- 使用 VSCode 的 ESLint 和 Prettier 插件
- 配置保存时自动格式化
- 开启编辑器的 ESLint 提示

VSCode 会自动提示安装推荐的插件，包括：

- ESLint: 代码检查
- Prettier: 代码格式化
- EditorConfig: 编辑器配置
- Code Spell Checker: 拼写检查
- Auto Rename Tag: 自动重命名标签
- Auto Close Tag: 自动闭合标签
- Path Intellisense: 路径智能提示
- NPM Intellisense: npm 模块智能提示

所有编辑器配置都已预设好，包括：

- 保存时自动格式化
- 保存时自动修复 ESLint 错误
- TypeScript 智能提示
- 文件类型关联

2. **Git 工作流**

- 提交前进行 lint 检查
- 遵循 commit 消息规范
- 使用 husky 强制执行规范

3. **团队协作**

- 统一使用此配置
- 在 code review 中检查规范执行情况
- 定期更新和维护规则

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交改动
4. 推送到分支
5. 创建 Pull Request
