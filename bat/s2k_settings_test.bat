@ECHO OFF
SETLOCAL
TITLE S2K UI TEST --- ["Settings"] MODULE

SET CurDate=%date%
SET CurTime=%time%
SET HH=%CurTime:~0,2%
SET H=%CurTime:~0,1%
SET L=%CurTime:~1,1%

IF "%H%"==" " (SET H=0)
IF "%H%%L%"=="%HH%" (SET HH=%HH%) ELSE (SET HH=%H%%L%)

CD E:\GitHub\s2k_ui_test\bat
E:
ECHO RUNNING S2K UI TEST --- ["Settings"] MODULE ...
ECHO PLEASE WAIT ...
@ECHO OFF
"C:\Program Files\nodejs\node.exe" "..\node_modules\protractor\lib\cli.js" "s2k_settings_conf.js" > ".\log\%CurDate:~0,10%T%HH%-%CurTime:~3,2%-%CurTime:~6,2%N%CurTime:~9,3%[SET].log"
ENDLOCAL
ECHO UI TEST FINISED. PLEASE CHECK THE LOG FILE.