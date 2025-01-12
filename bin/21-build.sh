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

# 2. 构建项目
print_green "开始构建项目..."
npm run build
check_status "项目构建"
