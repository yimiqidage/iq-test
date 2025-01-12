#!/bin/bash

# 设置变量
PROJECT_DIR="/Users/yimiqidage/workspace-web/unblur-image"
REMOTE_USER="root"  # 需要替换为实际的远程服务器用户名
REMOTE_HOST="47.89.232.116"  # 需要替换为实际的服务器IP
REMOTE_DIR="/app/aishengji/unblur-image"

# 输出颜色函数
print_green() {
    echo -e "\033[32m$1\033[0m"
}

print_red() {
    echo -e "\033[31m$1\033[0m"
}

# 检查命令执行状态
check_status() {
    if [ $? -eq 0 ]; then
        print_green "$1 成功"
    else
        print_red "$1 失败"
        exit 1
    fi
}

# 1. 进入项目目录
print_green "正在进入项目目录..."
cd "$PROJECT_DIR"
check_status "进入目录"

# 3. 打包.output目录
print_green "正在打包.output目录..."
# 确保在打包前删除旧的zip文件（如果存在）
rm -f .output.zip
# 进入.output目录，打包所有内容
cd .output && zip -r ../.output.zip . && cd ..
check_status "打包"

# 4. 上传到远程服务器
print_green "正在上传到远程服务器..."
scp .output.zip $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/
check_status "文件上传"

# # 5. 在远程服务器上解压文件
# print_green "正在远程解压文件..."
# ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_DIR && unzip -o .output.zip && rm .output.zip"
# check_status "远程解压"

print_green "部署完成！"