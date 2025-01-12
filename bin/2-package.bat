@echo off
:: 设置工作目录
set "WORKING_DIR=D:\workspace-github\nuxt3-new-project\unblur-image"
set "OUTPUT_DIR=%WORKING_DIR%\.output"
set "ARCHIVE_FILE=%WORKING_DIR%\.output.zip"

:: 进入工作目录
cd /d %WORKING_DIR%


:: 执行 npm run build
@REM echo Running npm run build...
@REM npm run build
@REM if errorlevel 1 (
@REM     echo npm run build failed!
@REM     pause
@REM )

:: 检查.output 目录是否存在
if not exist "%OUTPUT_DIR%" (
    echo Directory.output does not exist!
    pause
    exit /b 1
)

:: 检查 output.zip 是否存在并删除
if exist "%ARCHIVE_FILE%" (
    echo Deleting existing %ARCHIVE_FILE%...
    del "%ARCHIVE_FILE%"
    if errorlevel 1 (
        echo Failed to delete %ARCHIVE_FILE%!
        pause
        exit /b 1
    )
)

:: 压缩.output 目录
echo Compressing.output directory...
7z a -tzip "%ARCHIVE_FILE%" "%OUTPUT_DIR%\*"
if errorlevel 1 (
    echo Compression failed!
    pause
    exit /b 1
)

echo Compression successful. "%OUTPUT_DIR%*
pause