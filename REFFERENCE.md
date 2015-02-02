安装向导：
=========

	npm install -g protractor
	webdriver-manager update <更新出错时参考Error>

运行方法，先转到脚本目录下：

(1)打开1个命令行：<参考chromeOnly: true>

	protractor conf.js

(2)打开2个命令行：<参考seleniumAddress: 'http://localhost:4444/wd/hub'>

命令行1：

	webdriver-manager start

命令行2：

	protractor conf.js

更新出错时参考:
Error: Got error Error: getaddrinfo EAGAIN from https://selenium-release.storage
.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar
保存jar文件到目录C:\Users\... ...\AppData\Roaming\npm\node_modules\protractor\selenium\

Error: Got error Error: connect ETIMEDOUT from https://chromedriver.storage.goog
leapis.com/2.10/chromedriver_win32.zip
chromedriver_win32.zip改名为chromedriver_2.10.zip
解压到目录C:\Users\... ...\AppData\Roaming\npm\node_modules\protractor\selenium\chromedriver.exe

UnknownError: unknown error: Chrome version must be >= 33.0.1750.0
需要升级Chrome浏览器的版本。

参考链接：使用chromedriver webdriver测试打不开页面问题
http://www.366help.com/index.php?m=content&c=index&a=show&catid=13&id=4466

Protractor参考文档
https://github.com/angular/protractor/tree/master/docs

Protractor Using Locators
https://github.com/angular/protractor/blob/master/docs/locators.md
例如：by.css, by.id, by.model, by.binding, ...

JavaScript单元测试系列二：将Jasmine集成到JsTestDriver (by: 大漠穷秋)
http://www.angularjs.cn/A0ba#!

toBe()
toBeDefined()
toBeUndefined()
toBeNull()
toBeTruthy()
toBeFalsy()
toEqual()
toBeLessThan()
toBeGreaterThan()
toContain()
toBeCloseTo()
toHaveBeenCalled()
toHaveBeenCalledWith()
toMatch()
toThrow()

expect的参考用法：javascript单元测试
http://www.xue5.com/WebDev/JavaScript/716561.html

How to deliver a click with modifier keys via Selenium's WebDriver
#复合按键, 例如: Ctrl+Click
http://stackoverflow.com/questions/8552740/how-to-deliver-a-click-with-modifier-keys-via-seleniums-webdriver

How to query ElementArrayFinder?
#使用element().filter()
http://stackoverflow.com/questions/23889500/how-to-query-elementarrayfinder
/*
var expectedValue = 'name';
element.all(by.model('clientSearchType')).filter(function(elementFinder){
    return elementFinder.getAttribute('value').then(function(value){
        return value === expectedValue;
    });
});
*/

用node.js开发命令行工具
http://binbinliao.com/programming/commandline-nodejs.html

child_process.exec执行批处理
https://cnodejs.org/topic/4fd9a164e7f86b4213002a77

获取当前元素(element)的坐标、尺寸
http://blog.csdn.net/gzh0222/article/details/7568527
http://stackoverflow.com/questions/24918028/protractor-how-to-access-the-elementfinder-class-from-within-a-test
element.getLocation().then(function(position){
    var x = position.x;
    var y = position.y;
});
element.getSize().then(function(size){
    var w = size.width;
    var h = size.height;
});

滚动窗体命令window.scrollTo(x,y)
browser.executeScript('window.scrollTo(0,0)');

旧的bat命令行，现在要替换成执行node s2k_exec.js方式
/*

@ECHO OFF
SETLOCAL
TITLE S2K UI TEST --- ["Logs"] MODULE

SET CurDate=%date%
SET CurTime=%time%
SET HH=%CurTime:~0,2%
SET H=%CurTime:~0,1%
SET L=%CurTime:~1,1%

IF "%H%"==" " (SET H=0)
IF "%H%%L%"=="%HH%" (SET HH=%HH%) ELSE (SET HH=%H%%L%)

CD E:\GitHub\s2k_ui_test\bat
E:
ECHO RUNNING S2K UI TEST --- ["Logs"] MODULE ...
ECHO PLEASE WAIT ...
@ECHO OFF
"C:\Program Files\nodejs\node.exe" "..\node_modules\protractor\lib\cli.js" "s2k_logs_conf.js" > ".\log\%CurDate:~0,10%T%HH%-%CurTime:~3,2%-%CurTime:~6,2%N%CurTime:~9,3%[LOG].log"
ENDLOCAL
ECHO UI TEST FINISED. PLEASE CHECK THE LOG FILE.

*/