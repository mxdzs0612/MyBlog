set /p commit_log=������ commit ��־��Ϣ:
git status
git add .
git commit -m "%commit_log%"
git push
hexo clean
heco g -d
pause