/**
 * Created by Lin.Zhi on 2014-11-21.
 */
var exec = require('child_process').exec;
var moment = require('moment');

var filename = moment().format('YYYY-MM-DD HH-mm-ss.SSS') + '[SET].log';
console.log('RUNNING S2K UI TEST --- ["Settings"] MODULE ...\nPLEASE WAIT ...');
exec('protractor s2k_pricemodify_conf.js > "log/' + filename + '"', function(error, stdout, stderr) {
    if ( !error ) {
        console.log('UI TEST FINISED. \nPLEASE CHECK THE LOG FILE: "' + filename + '"');
        //console.log(stdout);
    } else {
        console.log('UI TEST ERROR. \nPLEASE CHECK THE LOG FILE: "' + filename + '"');
        console.log(error);
    }
});