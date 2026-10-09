@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo 找不到 Node.js，請先安裝並重新開啟此視窗。
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo 正在安裝專案套件...
    call npm.cmd ci
    if errorlevel 1 (
        echo 套件安裝失敗。
        pause
        exit /b 1
    )
)

echo.
echo 正在啟動本機網站，請開啟終端機顯示的 Local 網址。
echo 按 Ctrl+C 可停止伺服器。
echo.

call npm.cmd run docs:dev
pause