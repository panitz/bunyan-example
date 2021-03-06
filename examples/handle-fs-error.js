// Example handling an fs error for a Bunyan-created
// stream: we create a logger to a file that is read-only.

const fs = require('fs');
const bunyan = require('bunyan');

const FILENAME = 'handle-fs-error.log';
const S_IWUSR = 00200; // mask for owner write permission in stat mode

console.warn('- Log file is "%s".', FILENAME);
if (!fs.existsSync(FILENAME)) {
    console.warn('- Touch log file.');
    fs.writeFileSync(FILENAME, 'touch\n');
}
if (fs.statSync(FILENAME).mode & S_IWUSR) {
    console.warn('- Make log file read-only.');
    fs.chmodSync(FILENAME, 0444);
}

console.warn('- Create logger.');
const log = bunyan.createLogger({
    name: 'handle-fs-error',
    streams: [
        {path: FILENAME}
    ]
});

log.on('error', function (err) {
    console.warn('- The logger emitted an error:', err);
});

console.warn('- Call log.info(...).');
log.info('info log message');
console.warn('- Called log.info(...).');

setTimeout(function () {
    console.warn('- Call log.warn(...).');
    log.warn('warn log message');
    console.warn('- Called log.warn(...).');
}, 1000);
