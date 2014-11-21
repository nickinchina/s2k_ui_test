s2k_ui_test
===========

s2k protractor e2e UI test

"s2k_ui_test" Setup Steps:

    $ git clone https://github.com/luckylz2git/s2k_ui_test.git
    $ cd s2k_ui_test
    $ npm install

    $ md selenium
    $ cd selenium

download selenium-server-standalone-2.43.1.jar

    https://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar

download chromedriver_win32.zip

    https://chromedriver.storage.googleapis.com/2.10/chromedriver_win32.zip

unzip to selenium folder: chromedriver.exe

    $ cd node_modules\protractor
    $ npm install

set a "run configuration" as Node.js in WebStorm

 - Name: s2k_conf
 - Node interpreter: C:\Program Files\nodejs\node.exe
 - Working directory: ..\s2k_ui_test\app
 - JavaScript file: ..\node_modules\protractor\lib\cli.js
 - Application parameters: s2k_conf.js

run "s2k_conf"

command line
    $ protractor s2k_conf.js

bat folder (ui actual test files)

 - please ref the RUN.md