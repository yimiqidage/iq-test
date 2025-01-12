#!/bin/bash

# 获取当前时间，格式为YYYYMMDDHHMMSS
current_time=$(date +"%Y%m%d%H%M%S")
APP_PORT=3050

# 如果output文件夹存在，则备份
if [ -d ".output" ]; then
  # 创建备份文件夹，并命名为output_YYYYMMDDHHMMSS
  backup_folder="output_$current_time"
  mv .output "$backup_folder"
  echo ".output文件夹已备份为$backup_folder"
fi

# 解压output.zip文件到output文件夹
unzip .output.zip -d .output
echo ".output.zip已解压到.output文件夹"

# 定义应用程序路径和端口
APP_PATH=".output/server/index.mjs"


# 查找使用指定端口的进程ID
PID=$(lsof -ti:$APP_PORT)

# 如果找到进程,则终止它
if [ ! -z "$PID" ]; then
    echo "发现运行在端口 $APP_PORT 的进程 (PID: $PID). 正在终止..."
    kill $PID
    sleep 2  # 等待进程完全终止
fi

# 启动应用程序
echo "正在启动应用程序..."
# nohup node $APP_PATH --port=$PORT> app.log 2>&1 &
 nohup env PORT=$APP_PORT node $APP_PATH > app.log 2>&1 &


echo "应用程序已重启."