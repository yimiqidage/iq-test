@echo off
setlocal

rem 配置参数
set "sourceFolder=D:\workspace-github\nuxt3-new-project\iq-test\.output.zip"
set "remoteIP=%SERVER_IP_V_YOURTIME%"
set "remotePort=22"
set "remoteUser=root"
set "remotePass=%PASSWORD_V_YOURTIME%"
set "remotePath=/app/aishengji/iq-test"

rem 使用 pscp 上传文件夹
pscp -r -P %remotePort% -pw %remotePass% "%sourceFolder%" %remoteUser%@%remoteIP%:"%remotePath%"

pause

endlocal
