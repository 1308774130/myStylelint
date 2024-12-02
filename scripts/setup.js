const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function setupGitHooks() {
  try {
    // 安装 husky
    execSync('npx husky install', { stdio: 'inherit' });

    // 添加 commit-msg hook
    execSync('npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"', {
      stdio: 'inherit',
    });

    // 添加 pre-commit hook
    execSync('npx husky add .husky/pre-commit "npx lint-staged"', {
      stdio: 'inherit',
    });

    // 更新 package.json
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const pkg = require(pkgPath);

    // 添加 prepare 脚本
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.prepare = 'husky install';

    // 添加 lint-staged 配置
    pkg['lint-staged'] = {
      '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
      '*.{json,md}': ['prettier --write']
    };

    // 写回 package.json
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log('✅ Git hooks 配置成功！');
  } catch (error) {
    console.error('❌ 配置失败：', error);
    process.exit(1);
  }
}

setupGitHooks(); 