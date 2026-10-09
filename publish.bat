
@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

set "REPO=https://github.com/Raymond-0314/awrecker-sensor.git"
set "BRANCH=main"

echo =========================================
echo    AWRECKER Sensor - GitHub Publisher
echo =========================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed.
    goto error
)

if not exist ".git" (
    echo [INFO] Initializing Git...
    git init
    if errorlevel 1 goto error
)

echo [1/5] Configuring repository...
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    git remote add origin "%REPO%"
) else (
    git remote set-url origin "%REPO%"
)
if errorlevel 1 goto error

echo [2/5] Checking branch...
git branch --show-current >nul 2>&1
if errorlevel 1 goto error

echo [3/5] Staging changes...
git add -A
if errorlevel 1 goto error

echo [4/5] Committing changes...
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Update AWRECKER Sensor website"
    if errorlevel 1 goto error
) else (
    echo [INFO] No new changes to commit.
)

echo [5/5] Pushing to GitHub...
git push -u origin HEAD:%BRANCH%
if errorlevel 1 goto error

echo.
echo =========================================
echo    SUCCESS - Uploaded to GitHub!
echo =========================================
echo.
echo https://github.com/Raymond-0314/awrecker-sensor
echo.
pause
exit /b 0

:error
echo.
echo =========================================
echo    FAILED - Check error messages above
echo =========================================
echo.
pause
exit /b 1
