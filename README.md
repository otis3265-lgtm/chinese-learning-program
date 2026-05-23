# 手机网页本地服务

这个项目现在只保留手机浏览器访问的本地 Web 服务。

## 启动

安装依赖：

```bash
npm install
```

启动服务：

```bash
npm start
```

电脑本机访问：

```text
http://localhost:3333
```

手机访问时，先查看电脑的局域网 IP：

```bash
ipconfig getifaddr en0
```

然后在同一 Wi-Fi 下用手机打开：

```text
http://你的局域网IP:3333
```

例如：

```text
http://192.168.1.23:3333
```

## 保留内容

- `server.js`：本地服务入口。
- `public/`：手机网页前端。
- `generated/`：本地运行产生的数据和图片。
- `.env`：本地 API 配置，按需保留。
