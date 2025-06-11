# MiniLinear - 项目管理系统

一个基于 Next.js 和 Supabase 的现代化项目管理和问题跟踪工具，灵感来自 Linear。

## 功能特性

### 🏢 工作空间管理

- 创建和管理多个工作空间
- 基于角色的权限控制（所有者、管理员、成员、查看者）
- 邀请和管理团队成员

### 📁 项目组织

- 在工作空间内创建项目
- 项目颜色和图标自定义
- 项目级别的任务组织

### 📋 问题跟踪

- 创建和管理问题/任务
- 自动生成问题标识符（如 TES-1, TES-2）
- 状态管理：待办、进行中、已完成、已取消
- 优先级设置：低、中、高、紧急
- 任务分配和报告者跟踪
- 问题评论系统

### 👀 自定义视图

- 创建个性化看板视图
- 筛选和排序功能
- 默认视图设置
- 视图配置保存

### 🔒 安全特性

- 基于 Supabase 的行级安全策略（RLS）
- 用户只能访问有权限的数据
- OAuth 登录支持（Google、Facebook）

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **UI 组件**: Mantine UI
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **样式**: TailwindCSS
- **图标**: Tabler Icons

## 数据库架构

### 核心表结构

1. **workspaces** - 工作空间
2. **workspace_members** - 工作空间成员
3. **projects** - 项目
4. **views** - 自定义视图
5. **issues** - 问题/任务
6. **issue_labels** - 问题标签
7. **issue_comments** - 问题评论
8. **user_profiles** - 用户资料

### 权限系统

使用 Supabase 的行级安全策略确保：

- 用户只能访问其有权限的工作空间数据
- 基于成员角色的操作权限控制
- 自动的用户资料创建

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Supabase 项目

### 安装

1. 克隆项目

```bash
git clone <repository-url>
cd minilinear
```

2. 安装依赖

```bash
npm install
```

3. 设置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. 设置数据库

在 Supabase SQL 编辑器中运行 `database/schema.sql` 文件中的 SQL 脚本。

5. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页（登录页）
│   ├── dashboard/         # 仪表板页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── LoginForm.tsx      # 登录表单
│   └── UserProfile.tsx    # 用户资料
├── lib/                   # 工具库
│   ├── auth.ts            # 认证相关
│   ├── supabase.ts        # Supabase 客户端
│   └── services/          # 数据服务层
│       ├── workspaceService.ts
│       ├── projectService.ts
│       ├── issueService.ts
│       └── viewService.ts
├── types/                 # TypeScript 类型定义
│   └── database.ts        # 数据库类型
database/
└── schema.sql             # 数据库架构
```

## 使用指南

### 1. 登录

- 使用 Google 或 Facebook 账户登录
- 首次登录会自动创建用户资料

### 2. 创建工作空间

- 点击"新建工作空间"
- 输入名称、标识符和描述
- 您将自动成为工作空间所有者

### 3. 创建项目

- 在工作空间中点击项目旁的"+"按钮
- 设置项目名称、标识符和颜色

### 4. 管理任务

- 点击"新建任务"创建问题
- 设置标题、描述、优先级
- 可选择关联到项目
- 系统自动生成唯一标识符

### 5. 团队协作

- 邀请成员到工作空间
- 设置成员角色和权限
- 分配任务给团队成员

## 开发

### 添加新功能

1. 在 `src/lib/services/` 中创建或更新服务类
2. 在 `src/components/` 中创建 React 组件
3. 在 `src/app/` 中添加新页面
4. 更新 `src/types/database.ts` 中的类型定义（如需要）

### 数据库变更

1. 在 `database/schema.sql` 中添加新的 SQL
2. 在 Supabase 中运行 SQL 脚本
3. 更新 TypeScript 类型定义

## 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量
3. 部署

### 环境变量

生产环境需要设置：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
