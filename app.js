var exec = require('child_process').exec;
var moment = require('moment');

var filename = moment().format('YYYY-MM-DD HH-mm-ss.SSS') + '[MRK].log';
console.log('RUNNING S2K UI TEST --- ["Marketing"] MODULE ...\nPLEASE WAIT ...');
exec('protractor s2k_marketing_conf.js > "log/' + filename + '"', {
  cwd: '/root/s2k_ui_test/bat'
}, function(error, stdout, stderr) {
    if ( !error ) {
        console.log('UI TEST ["Marketing"] MODULE FINISED. \nPLEASE CHECK THE LOG FILE: "' + filename + '"');
        //console.log(stdout);
    } else {
        console.log('UI TEST ["Marketing"] MODULE ERROR. \nPLEASE CHECK THE LOG FILE: "' + filename + '"');
        console.log(error);
    }
});
