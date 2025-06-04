# 飞书车辆状态展示项目（安全版）

本项目通过 Vercel 部署网页展示飞书表格中“空闲”状态的车辆二维码和车牌号。

## ✅ 安全说明

- 敏感信息（App ID 和 Secret）存储在 Vercel 环境变量中。
- 本地使用 `.env` 文件开发，未上传至 GitHub。

## 📦 文件说明

- `index.html`：前端展示页面，自动轮询飞书表格数据。
- `api/vehicle.js`：Node API，用于从飞书获取数据。
- `vercel.json`：Vercel 配置文件。
- `.env`：需在本地创建，格式如下：

```
FEISHU_APP_ID=cli_...
FEISHU_APP_SECRET=...
```

## 🚀 部署步骤

1. 上传项目至 GitHub。
2. 在 Vercel 创建项目并绑定仓库。
3. 在 Vercel → Project Settings → Environment Variables 添加：

- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`

4. 点击 Deploy 即可。