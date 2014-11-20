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
