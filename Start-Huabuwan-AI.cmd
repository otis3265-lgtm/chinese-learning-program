@echo off
setlocal

set "APP_DIR=E:\huabuwan-ai-web"
set "PORT=3333"
set "URL=http://localhost:3333"

cd /d "%APP_DIR%"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Please install Node.js first.
  pause
  exit /b 1
)

if not exist "%APP_DIR%\node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

for /f "tokens=5" %%p in ('netstat -ano ^| findstr /r /c:":%PORT% .*LISTENING"') do set "LISTENER_PID=%%p"

if not defined LISTENER_PID (
  start "" /b cmd /c "cd /d \"%APP_DIR%\" && node server.js"
  timeout /t 2 /nobreak >nul
)

start "" "%URL%"

endlocal
