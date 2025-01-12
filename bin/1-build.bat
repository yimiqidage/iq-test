@echo off
:: 设置工作目录
set "WORKING_DIR=D:\workspace-github\nuxt3-new-project\unblur-image"
set "OUTPUT_DIR=%WORKING_DIR%\.output"
set "ARCHIVE_FILE=%WORKING_DIR%\output.zip"

:: 进入工作目录
cd /d %WORKING_DIR%


:: 执行 npm run build
echo Running npm run build...
npm run build
if errorlevel 1 (
    echo npm run build failed!
    pause
)