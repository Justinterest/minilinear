# 自动部署配置

本项目已配置 GitHub Actions，可以在代码合并到 `master` 或 `main` 分支时自动部署到 Vercel。

## 设置步骤

### 1. 在 Vercel 中设置项目

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project" 创建新项目
3. 连接你的 GitHub 仓库
4. 选择 `minilinear` 项目
5. 保持默认设置，点击 "Deploy"

### 2. 获取 Vercel 凭证

部署成功后，你需要获取以下信息：

1. **Vercel Token**:

   - 访问 [Vercel Settings > Tokens](https://vercel.com/account/tokens)
   - 创建新的 token

2. **Organization ID**:

   - 在 Vercel Dashboard 的 Settings > General 中找到

3. **Project ID**:
   - 在项目的 Settings > General 中找到

### 3. 在 GitHub 中设置 Secrets

在你的 GitHub 仓库中：

1. 进入 Settings > Secrets and variables > Actions
2. 点击 "New repository secret"
3. 添加以下 secrets：
   - `VERCEL_TOKEN`: 你的 Vercel token
   - `VERCEL_ORG_ID`: 你的组织 ID
   - `VERCEL_PROJECT_ID`: 你的项目 ID

## 工作流程

配置完成后，工作流程如下：

1. 当代码推送到 `master` 或 `main` 分支时，GitHub Actions 自动触发
2. 运行以下步骤：
   - 检出代码
   - 安装 Node.js 和依赖
   - 运行 linting 检查
   - 构建项目
   - 部署到 Vercel（仅在主分支）

## 文件说明

- `.github/workflows/deploy.yml`: GitHub Actions 工作流配置
- `vercel.json`: Vercel 部署配置
- `DEPLOYMENT.md`: 本部署说明文档

## 注意事项

- 只有推送到 `master` 或 `main` 分支的代码才会被部署到生产环境
- Pull Request 会触发构建和测试，但不会部署
- 确保所有 secrets 都已正确配置，否则部署会失败
