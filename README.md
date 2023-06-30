# 百度网盘下载助手 自动化脚本

这边维护了油猴 （Tamper Monkey) 上一些百度网盘下载助手的自动化油猴脚本  
他们都可以提供全速下载，但是无法下载文件夹，多个文件需要一个个点，所以有了该仓库


## 当前支持
* [千千下载助手](https://greasyfork.org/zh-CN/scripts/463171-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E5%8D%83%E5%8D%83%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B) 
* [KubeDown](https://greasyfork.org/zh-CN/scripts/463832-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%B8%8D%E9%99%90%E9%80%9F%E4%B8%8B%E8%BD%BD-kubedown)

## 自动化脚本

* [百度网盘-千千下载助手-自动下载文件夹中的文件](https://greasyfork.org/zh-CN/scripts/469709-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98-%E5%8D%83%E5%8D%83%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E8%87%AA%E5%8A%A8%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E5%A4%B9%E4%B8%AD%E7%9A%84%E6%96%87%E4%BB%B6)  
github: [kubedown_helper.js](https://github.com/AlpsMonaco/PanAutoHelper/blob/main/qianqian_helper.js)
* [百度网盘-KubeDown-自动下载文件夹中的文件 ](https://greasyfork.org/zh-CN/scripts/469845-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98-kubedown-%E8%87%AA%E5%8A%A8%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E5%A4%B9%E4%B8%AD%E7%9A%84%E6%96%87%E4%BB%B6)  
github: [kubedown_helper.js](https://github.com/AlpsMonaco/PanAutoHelper/blob/main/kubedown_helper.js)


## 原理
模拟用户选择要下载的文件，然后勾选，触发助手的按钮然后获取链接，通过jsonrpc连接到motrix的aria2，发起下载任务并监听完成，然后模拟勾选下个文件，重复此过程。

## 附录
因为kubedown每次下载都需要验证码  
所以 **“百度网盘-KubeDown-自动下载文件夹中的文件”** 这个脚本需要依赖我写的一个验证码识别服务器  
源码地址 https://github.com/AlpsMonaco/captcha_solver_web  
下载地址 https://github.com/AlpsMonaco/captcha_solver_web/releases/download/publish/captcha_resolver.exe


## Thanks
* [aria2.js](https://github.com/sonnyp/aria2.js/)
* [Motrix](https://github.com/agalwood/Motrix)
* 千千下载助手的作者
* KubeDown的作者



## 如果对您起到帮助，您也喜欢本仓库，请给一个star，谢谢~