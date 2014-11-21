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

CD C:\GitHub\s2k_ui_test\bat
C:
ECHO RUNNING S2K UI TEST --- ["Products"] MODULE ...
ECHO PLEASE WAIT ...
@ECHO OFF
dir > "log\test.log"
ENDLOCAL
ECHO UI TEST FINISED. PLEASE CHECK THE LOG FILE.
