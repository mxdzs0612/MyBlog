---
title: 安装、配置WSL并在其中安装Docker
date: 2019-10-09 16:31:40
category: 后端开发
tags: [Linux, WSL, Docker]
---
本文总结了使用WSL（Windows Subsystem for Linux，即Windows系统自带的Linux子系统）安装Docker的方法。

<!-- more -->

使用WSL的优点是无需双系统，启动快，更加流畅，切换方便，剪贴板和文件均可共享，十分易用，适合入门。缺点是Linux只有终端，没有桌面环境，资源利用率低，且可能会出现一些奇奇怪怪的问题。

读者最好要先熟悉Linux的基本操作，尤其是能够初步上手vim，至少要能够对着快捷键参照表使用vim编辑器进行基本的键入、复制、粘贴、撤销等操作。

本文部分内容参考了[知乎](https://zhuanlan.zhihu.com/p/61542198)的文章，在此声明。

本文有部分内容是笔者踩完坑后凭印象写的，可能会有疏漏、前后颠倒、逻辑顺序错误等情况，如果读者发现哪里不对，还望发评论提醒一下，笔者会立即修改。

## 环境配置
```
操作系统： Windows 10 1903 专业版 64位 版本18362
```
注意家庭版是不行的。一些学校会提供正版的专业版Windows 10，没有的话还请自寻办法。

首先要开启window功能。
> 设置>应用>程序和功能>启用或关闭window功能

勾选“适用于Linux的Windows子系统”前的方框。

然后在“管理可选功能”中添加“OpenSSH客户端”。如果不想在Windows终端中操作WSL，这一步可以省略不做。

## 安装WSL系统
打开`Microsoft Store`，在搜索框输入`WSL`，挑选你喜欢的Linux子系统。目前并没有几种可用的选择，这里就以Ubuntu 18.04 LTS为例。点击获取，等待下载完毕。

之后可能会要求重启电脑。

装好的系统会像应用一样出现在开始菜单中。点击打开系统，等待一段时间，系统会自动进行初始化。初始化过程中会要求设置用户名和密码，个人电脑建议不要设置得太过复杂，以免在之后频繁输入的过程中造成不必要的麻烦。

可输入以下指令查看基本信息，检查安装的效果。
```shell
#查看linux内核版本
uname -r

#查看系统版本
cat /etc/lsb-release

#查看本地磁盘内存情况（可见C盘、D盘）
df -h
```
默认的安装位置为：`C:\Users\你的用户名 \AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04onWindows_xxxxxxxxxxxxx\`。此目录中，`LocalState\rootfs\`文件夹下即为Ubuntu的根目录。熟悉Ubuntu的同学应该很容易通过其中的文件结构辨认出来。

## 配置WSL系统
强烈建议将软件源更换为国内源，因为在国内使用官方源下载的速度实在过于感人。推荐阿里源和中科大源，具体内容可以很容易搜索到。这里以阿里源为例。
```shell
#使用root权限登录，然后输入密码
sudo -i

#接下来备份当前源，输入以下命令
cp /etc/apt/sources.list /etc/apt/sources.list.old 

#这个sources.list文件就是源文件，删除该文件，重新写一个
rm /etc/apt/sources.list
vim /etc/apt/sources.list
```
此时会进入vim编辑器。将下面的内容复制进文件中即可。
输入`i`进入编辑模式，按右键粘贴或不进入编辑模式，输入`p`进行粘贴。然后按`ESC`退出编辑模式，输入`:wq`回车，保存并退出。
```
deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties
deb http://archive.canonical.com/ubuntu xenial partner
deb-src http://archive.canonical.com/ubuntu xenial partner
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable
# deb-src [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable
deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse
```
下面更新镜像源和软件包。
```shell
sudo apt update      #更新软件源
sudo apt upgrade     #更新软件包
```

## 美化vim
vim的默认情况下完全没法看，字体和背景都是深色，屏幕亮度不高时什么都看不清。建议更换主题。这里采用molokai配色。参考[此文](https://blog.csdn.net/zycdsg/article/details/79057698)。
```shell
mkdir .vim
cd .vim
git clone https://github.com/tomasr/molokai.git
cp -rf molokai/colors/ ./colors
vim vimrc
colorscheme molokai
```

## 使用Windows控制台登录WSL
可以通过SSH方法，使用终端登录WSL。这里使用的是`Windows Terminal`，1903版系统可以在`Microsoft Store`中获取。其实用自带的PowerShell也行，右击左下角开始菜单打开即可。
```shell
#设置root用户的口令（密码），用作后续登陆使用
sudo passwd root

#安装openssh-server（Ubuntu自带，可省）
sudo apt install openssh-server

#备份很重要
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

#使用vim进行编辑，按i进入insert模式
sudo vim /etc/ssh/sshd_config
```
在vim中分别找到并对应修改四处，修改后ESC，输入wq保存退出，具体如下：
```
Port = 8022
#ListenAddress 0.0.0.0        # 如果需要指定监听的IP则去除最左侧的井号，并配置对应IP，默认即监听PC所有IP。可不修改，保留井号。
PermitRootLogin yes           # 如果你需要用root直接登录系统则此处改为yes，在WSL中可能会不太好使，后文有解决办法。
PasswordAuthentication yes    # 将no改为yes表示使用帐号密码方式登录
```
之后启动SSH并检查状态，输出`sshd is running`的信息即说明配置正确。
```shell
sudo service ssh start             #启动SSH服务
sudo service ssh status            #检查状态
sudo systemctl enable ssh          #开机自动启动ssh命令，有时可能不好使
```
下一步需要配置ssh密钥。执行如下命令：
```shell
sudo ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
sudo ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key
sudo ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key
```
然后可尝试使用SSH登录。在终端输入
```bash
ssh  root@127.0.0.1 -p 8022
```
键入密码，即可登录。

如果遇到root用户的密码明明正确，却不断提示重试，且`PermitRootLogin`已开启，就只能通过下面这种方式登录：
```bash
ssh  你的用户名@127.0.0.1 -p 8022
```
输入密码后，执行
```shell
sudo -i
```
再次输入密码，也可达到同样的登录root用户的效果。

或者用这条语句，输入root用户的密码也可以。
```shell
su -
```
这样，只要ssh服务是开启的，就可以通过这种方式在Windows系统的控制台控制WSL。如果没开启，使用以下指令即可。
```shell
sudo service ssh restart
```
如果你的电脑不经常关机，重启的频率不算高，用支持多标签等功能的Windows Terminal来操作会很方便。

理论上在控制台使用`bash`命令直接切换到WSL环境应该也是可以的，然后输入`cd`，此时WSL会跳转到`/home/用户名`目录下，其实也等同于通过SSH的方法连接WSL，很方便。

## 安装Docker
按照[如下指令](https://blog.jayway.com/2017/04/19/running-docker-on-bash-on-windows/)安装即可。执行第一行时如果报警，可不必理会。
```shell
# Install packages to allow apt to use a repository over HTTPS
$ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
# Add Docker's official GPG key
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# Set up the repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# Update source lists
sudo apt-get update
# Install Docker
sudo apt-get install docker-ce
```
执行
```shell
docker --version
```
能正确显示版本号就是安装成功了。理论上我们就可以在WSL中愉快地使用Docker了。但实际操作过程中笔者发现通过这种方法安装的docker是使用不了的，因此还是建议安装Windows Desktop客户端，然后修改WSL中`.docker`路径下的配置信息来使用。