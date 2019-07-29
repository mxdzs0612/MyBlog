set /p commit_log=请输入 commit 日志信息:
git status
git add .
git commit -m "%commit_log%"
git push
hexo clean
heco g -d
pause