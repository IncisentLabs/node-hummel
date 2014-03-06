var opts = require('nomnom')
    .option('environment', {
        abbr: 'e',
        default: 'PROD',
        help: "runtime mode the for application."
    })
    .option('workers', {
        abbr: 'w',
        default: 1,
        help: 'number of workers to run with cluster module'
    })
    .option('port', {
        abbr: 'p',
        default: 8000,
        help: 'port to run on'
    });

module.exports = opts;
