const bunyan = require('bunyan');

// Basic usage.
const log = bunyan.createLogger({name: 'myapp', level: bunyan.INFO, src: true});

// isInfoEnabled replacement
console.log('log.info() is:', log.info())

// `util.format`-based printf handling
log.info('hi');
log.info('hi', 'trent');
log.info('hi %s there', true);

// First arg as an object adds fields to the log record.
log.info({foo:'bar', multiline:'one\ntwo\nthree'}, 'hi %d', 1, 'two', 3);

// Shows `log.child(...)` to specialize a logger for a sub-component.
console.log('\n')

function Wuzzle(options) {
    this.log = options.log;
    this.log.info('creating a wuzzle')
}

Wuzzle.prototype.woos = function () {
    this.log.warn('This wuzzle is woosey.')
}

const wuzzle = new Wuzzle({log: log.child({component: 'wuzzle'}, true)});
wuzzle.woos();
log.info('done with the wuzzle')
