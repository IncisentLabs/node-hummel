var bunyan = require('bunyan'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    cluster = require('cluster'),
    opts = require('./args').parse(),
    settings = require('./settings')(opts.mode);

var logConfig = _.extend({name: settings.pkg.name, streams: []}, settings.logging),
    logDir = path.join(settings.appDir, 'logs');

if (opts.mode === 'DEV') {
    logConfig.streams.push({
        level: 'debug',
        stream: process.stdout
    });
}

try {
    fs.statSync(logDir);
} catch(e) {
    fs.mkdirSync(logDir);
}

var logger = bunyan.createLogger(logConfig);

if (cluster.isWorker) {
    logger = logger.child({ worker: cluster.worker.id });
}

module.exports = logger;