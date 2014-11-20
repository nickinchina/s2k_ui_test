
@ECHO OFF
SETLOCAL
TITLE S2K UI TEST

SET CurDate=%date%
SET CurTime=%time%
SET HH=%CurTime:~0,2%
SET H=%CurTime:~0,1%
SET L=%CurTime:~1,1%

IF "%H%"==" " (SET H=0)
IF "%H%%L%"=="%HH%" (SET HH=%HH%) ELSE (SET HH=%H%%L%)

CD C:\GitHub\s2k_ui_test\app
C:
@ECHO ON
"C:\Program Files\nodejs\node.exe" "C:\GitHub\s2k_ui_test\node_modules\protractor\lib\cli.js" s2k_conf.js > "%CurDate:~0,10%T%HH%-%CurTime:~3,2%-%CurTime:~6,2%N%CurTime:~9,3%.LOG"
@ECHO OFF
ENDLOCAL
PAUSE