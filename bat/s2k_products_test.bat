@ECHO OFF
SETLOCAL
TITLE S2K UI TEST --- ["Products"] MODULE

SET CurDate=%date%
SET CurTime=%time%
SET HH=%CurTime:~0,2%
SET H=%CurTime:~0,1%
SET L=%CurTime:~1,1%

IF "%H%"==" " (SET H=0)
IF "%H%%L%"=="%HH%" (SET HH=%HH%) ELSE (SET HH=%H%%L%)

ECHO RUNNING S2K UI TEST --- ["Products"] MODULE ...
ECHO PLEASE WAIT ...
@ECHO OFF
protractor s2k_products_conf.js > log\%CurDate:~0,10%T%HH%-%CurTime:~3,2%-%CurTime:~6,2%N%CurTime:~9,3%[PRD].log
ENDLOCAL
ECHO UI TEST FINISED. PLEASE CHECK THE LOG FILE.
