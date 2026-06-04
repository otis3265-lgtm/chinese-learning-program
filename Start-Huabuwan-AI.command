#!/bin/zsh
set -u

APP_DIR="/Users/wuotis/Documents/2026-05-16/api"
PORT="${PORT:-3333}"
URL="http://localhost:${PORT}"

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
fi

cd "$APP_DIR" || {
  osascript -e 'display alert "启动失败" message "找不到项目文件夹：/Users/wuotis/Documents/2026-05-16/api"'
  exit 1
}

if ! command -v node >/dev/null 2>&1; then
  osascript -e 'display alert "启动失败" message "没有找到 Node.js，请先安装 Node.js 后再双击启动。"'
  exit 1
fi

if [ ! -d "$APP_DIR/node_modules" ]; then
  echo "第一次启动，正在安装依赖..."
  npm install || {
    osascript -e 'display alert "启动失败" message "依赖安装失败，请打开终端查看错误信息。"'
    exit 1
  }
fi

if ! lsof -iTCP:"$PORT" -sTCP:LISTEN -n -P >/dev/null 2>&1; then
  echo "正在启动网站服务..."
  nohup node server.js > "$APP_DIR/server.log" 2>&1 &
  sleep 2
else
  echo "网站服务已经在运行。"
fi

open "$URL"
echo "已打开：$URL"
echo "这个窗口可以关闭，网站服务会继续在后台运行。"
