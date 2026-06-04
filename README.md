# 画不完 AI 本地网站

这是一个可以在本机运行的 Node/Express 图片工具网站。

## 第一次使用

1. 安装依赖：

   ```bash
   npm install
   ```

2. 复制环境变量文件：

   ```bash
   cp .env.example .env
   ```

3. 打开 `.env`，填写你的 API 配置：

   ```env
   PORT=3333
   DEFAULT_CONFIGURED_USER=otis
   OTIS_API_KEY=你的图片 API key
   OTIS_CHAT_API_KEY=你的聊天 API key
   OTIS_BASE_URL=https://www.ydn99.com/v1
   OTIS_IMAGE_MODEL=gpt-image-2
   OTIS_LAYER_IMAGE_MODEL=gpt-image-2
   OTIS_CHAT_MODEL=gpt-5.4-mini
   OTIS_API_ENTRY_NAME=YDN99
   ```

4. 启动服务：

   ```bash
   npm start
   ```

5. 本机打开：

   ```text
   http://localhost:3333
   ```

项目里提供了 Windows 启动脚本：

```text
Start-Huabuwan-AI.cmd
```

项目里提供了 mac 启动脚本：

```text
Start-Huabuwan-AI.command
```

双击后会自动进入项目目录、检查依赖、启动服务并打开浏览器。如果 mac 第一次提示安全限制，可以右键脚本选择“打开”。

## 同一 Wi-Fi 设备访问

先查看本机局域网 IP：

```bash
ipconfig getifaddr en0
```

其他设备打开：

```text
http://你的局域网IP:3333
```

例如：

```text
http://192.168.1.23:3333
```

## Railway 部署

Railway 上需要设置环境变量：

```env
DEFAULT_CONFIGURED_USER=otis
OTIS_API_KEY=你的图片 API key
OTIS_CHAT_API_KEY=你的聊天 API key
OTIS_BASE_URL=https://www.ydn99.com/v1
OTIS_IMAGE_MODEL=gpt-image-2
OTIS_LAYER_IMAGE_MODEL=gpt-image-2
OTIS_CHAT_MODEL=gpt-5.4-mini
OTIS_API_ENTRY_NAME=YDN99
```

Railway 会自动提供 `PORT`，线上环境不要手动固定端口。

### Railway 持久化图片

生成图片、用户配置和历史记录默认写入项目里的 `generated/`。Railway 重新部署时，容器本地文件系统不适合长期保存这些文件。

在 Railway 上需要长期保存时，给当前 Web 服务创建并挂载一个 Volume。代码会优先使用 Railway 自动提供的 `RAILWAY_VOLUME_MOUNT_PATH`，也支持手动设置 `GENERATED_DIR` 指向持久化目录。

推荐配置：

1. 在 Railway 项目里给 Web 服务创建 Volume。
2. Mount path 设置为 `/app/generated`。
3. 重新部署服务。

如果你选择其他挂载路径，也可以把服务环境变量 `GENERATED_DIR` 设置为该路径。

## 注意

- 不要把 `.env` 上传到 GitHub。
- `generated/` 是本地生成图片目录，默认不会上传。
- Railway 线上长期保存图片时请挂载 Volume；更大规模或多服务共享时建议改用 Cloudflare R2/S3。
- 部署触发标记：2026-05-20。
