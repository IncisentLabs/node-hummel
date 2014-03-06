var bunyan = require('bunyan'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    cluster = require('cluster'),
    opts = require('./args').parse(),
    settings = require('./settings')();

var logConfig = _.extend({name: settings.pkg.name, streams: []}, settings.logging);

if (opts.environment === 'DEV') {
    logConfig.streams.push({
        level: 'debug',
        stream: process.stdout
    });
}
var logsDir = settings.logsDir;

if (logsDir.indexOf('/') !== 0) {
    logsDir = path.join(settings.appDir, logsDir);
}

try {
    fs.statSync(logsDir);
} catch(e) {
    fs.mkdirSync(logsDir);
}

_.each(logConfig.streams, function(stream) {
    if (stream.path && stream.path.indexOf('/') !== 0) {
        stream.path = path.join(logsDir, stream.path);
    }
});

var logger = bunyan.createLogger(logConfig);

if (cluster.isWorker) {
    logger = logger.child({ worker: cluster.worker.id });
}

logger.info(logConfig);

module.exports = logger;