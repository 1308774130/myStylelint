#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 检查并安装所需依赖
async function checkAndInstallDependencies(includeGitHooks = false) {
  console.log("检查依赖版本...");

  // 从当前包的 package.json 读取 peerDependencies
  const packagePath = path.resolve(__dirname, "../package.json");
  const packageJson = require(packagePath);
  const allDeps = packageJson.peerDependencies || {};

  // 分离 git hooks 相关依赖和基础依赖
  const gitDeps = {
    "@commitlint/cli": allDeps["@commitlint/cli"],
    husky: allDeps["husky"],
    "lint-staged": allDeps["lint-staged"],
  };

  const baseDeps = {
    eslint: allDeps["eslint"],
    prettier: allDeps["prettier"],
  };

  // 根据用户选择决定要安装的依赖
  const requiredDeps = includeGitHooks ? { ...baseDeps, ...gitDeps } : baseDeps;

  // 读取目标项目的 package.json
  const projectPkgPath = path.resolve(process.cwd(), "package.json");
  const projectPkg = require(projectPkgPath);
  const projectDeps = {
    ...projectPkg.dependencies,
    ...projectPkg.devDependencies,
  };

  const missingDeps = [];
  const outdatedDeps = [];

  // 版本比较函数
  function compareVersions(v1, v2) {
    const v1Parts = v1.replace(/[^\d.]/g, "").split(".");
    const v2Parts = v2.replace(/[^\d.]/g, "").split(".");

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const num1 = parseInt(v1Parts[i] || 0);
      const num2 = parseInt(v2Parts[i] || 0);
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }

  for (const [dep, requiredVersion] of Object.entries(requiredDeps)) {
    const currentVersion = projectDeps[dep];
    const requiredMajorVersion = requiredVersion.replace(/[^\d]/, "");

    if (!currentVersion) {
      // 依赖不存在，需要安装
      const normalizedVersion = requiredVersion.replace(/^>=/, "^");
      missingDeps.push(`${dep}@${normalizedVersion}`);
    } else {
      // 检查版本是否满足要求
      const currentMajorVersion = currentVersion.replace(/[^\d]/, "");
      if (compareVersions(requiredMajorVersion, currentMajorVersion) > 0) {
        outdatedDeps.push({
          name: dep,
          current: currentVersion,
          required: requiredVersion,
        });
      }
    }
  }

  // 如果有过期的依赖，抛出错误
  if (outdatedDeps.length > 0) {
    console.error("\n❌ 检测到以下依赖版本过低：");
    outdatedDeps.forEach(({ name, current, required }) => {
      console.error(`  ${name}: 当前版本 ${current}, 需要 ${required}`);
    });
    console.error("\n请手动更新后再进行操作：");
    console.error(
      "\nnpm install " +
        outdatedDeps
          .map(({ name, required }) => `${name}@${required.replace(/^>=/, "")}`)
          .join(" ") +
        " --save-dev\n"
    );
    throw new Error("依赖版本不满足要求");
  }

  // 安装缺失的依赖
  if (missingDeps.length > 0) {
    console.log("正在安装缺失的依赖...", missingDeps);
    try {
      execSync(`npm install -D ${missingDeps.join(" ")}`, {
        stdio: "inherit",
        env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
      });
    } catch (error) {
      console.error("依赖安装失败，请手动安装以下依赖：");
      console.error(missingDeps.join("\n"));
      throw error;
    }
  } else {
    console.log("所有必需依赖已安装");
  }
}

// 创建或更新配置文件
function updateConfigFiles() {
  console.log("更新 ESLint 和 Prettier 配置文件...");

  const eslintPath = path.resolve(process.cwd(), ".eslintrc.js");
  const prettierPath = path.resolve(process.cwd(), ".prettierrc.js");

  // 读取现有配置
  let existingEslintConfig = {};
  let existingPrettierConfig = {};

  try {
    if (fs.existsSync(eslintPath)) {
      existingEslintConfig = require(eslintPath);
      console.log("找到现有的 ESLint 配置");
    }
  } catch (error) {
    console.log("无法读取现有的 ESLint 配置，将创建新配置");
  }

  try {
    if (fs.existsSync(prettierPath)) {
      existingPrettierConfig = require(prettierPath);
      console.log("找到现有的 Prettier 配置");
    }
  } catch (error) {
    console.log("无法读取现有的 Prettier 配置，将创建新配置");
  }

  // 更新 ESLint 配置
  const eslintConfig = {
    ...existingEslintConfig,
    extends: [
      ...(Array.isArray(existingEslintConfig.extends)
        ? existingEslintConfig.extends
        : existingEslintConfig.extends
          ? [existingEslintConfig.extends]
          : []
      ).filter((ext) => ext !== "@ctrip/eslint-config-cruise"),
      "@ctrip/eslint-config-cruise",
    ],
  };

  // 更新 Prettier 配置
  const prettierConfig = {
    ...existingPrettierConfig,
    extends: [
      ...(Array.isArray(existingPrettierConfig.extends)
        ? existingPrettierConfig.extends
        : existingPrettierConfig.extends
          ? [existingPrettierConfig.extends]
          : []
      ).filter((ext) => ext !== "@ctrip/eslint-config-cruise/prettier"),
      "@ctrip/eslint-config-cruise/prettier",
    ],
  };

  // 写入 .eslintrc.js
  fs.writeFileSync(
    eslintPath,
    `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`
  );

  // 写入 .prettierrc.js
  fs.writeFileSync(
    prettierPath,
    `module.exports = ${JSON.stringify(prettierConfig, null, 2)}`
  );

  console.log("配置文件更新完成");
}

async function askForGitHooks() {
  return new Promise((resolve) => {
    rl.question("是否需要配置 Git 提交规范？(y/n) ", (answer) => {
      resolve(answer.toLowerCase() === "y");
    });
  });
}

async function setupGitHooks(pkg) {
  try {
    console.log("配置 Git 提交规范...");

    // 1. 确保 .git 目录存在
    if (!fs.existsSync(".git")) {
      console.log("未找到 .git 目录，初始化 Git 仓库...");
      execSync("git init", { stdio: "inherit" });
    }

    // 2. 确保所有依赖都已安装
    console.log("安装必要依赖...");
    execSync("npm install husky @commitlint/cli lint-staged --save-dev", {
      stdio: "inherit",
    });

    // 3. 添加 husky 相关脚本并立即写入 package.json
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.prepare = "husky install";

    const pkgPath = path.resolve(process.cwd(), "package.json");
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // 4. 初始化 husky
    console.log("初始化 husky...");
    const huskyModule = require(
      path.resolve(process.cwd(), "node_modules/husky")
    );

    // 确保 .husky 目录存在
    const huskyDir = path.resolve(process.cwd(), ".husky");
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
    }

    // 使用 husky CLI 命令
    execSync("npx --no husky install", {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, HUSKY: "0" },
    });

    // 5. 配置 Git hooks
    console.log("配置 Git hooks...");

    // 添加 commit-msg hook
    execSync(
      'npx --no husky add .husky/commit-msg "npx --no -- commitlint --edit $1"',
      {
        stdio: "inherit",
        shell: true,
        env: { ...process.env, HUSKY: "0" },
      }
    );

    // 添加 pre-commit hook
    execSync('npx --no husky add .husky/pre-commit "npx lint-staged"', {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, HUSKY: "0" },
    });

    // 6. 添加 lint-staged 配置
    pkg["lint-staged"] = {
      "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
      "*.{json,md}": ["prettier --write"],
    };

    return true;
  } catch (error) {
    console.error("Git hooks 配置失败：", error.message);
    return false;
  }
}

async function setup() {
  try {
    // 询问是否配置 Git 规范
    const setupGit = await askForGitHooks();

    // 根据用户选择安装依赖
    await checkAndInstallDependencies(setupGit);

    // 基础 lint 配置总是会执行
    console.log("开始配置 ESLint 和 Prettier...");

    // 更新配置文件
    updateConfigFiles();

    // 更新 package.json 的配置
    const pkgPath = path.resolve(process.cwd(), "package.json");
    const pkg = require(pkgPath);

    if (setupGit) {
      const success = await setupGitHooks(pkg);
      if (!success) {
        console.log("Git 提交规范配置失败，但其他配置已完成");
      }
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("✅ 配置完成！");
  } catch (error) {
    console.error("❌ 配置失败：", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setup();
