var bunyan = require('bunyan'),
    _ = require('lodash'),
    path = require('path'),
    cluster = require('cluster'),
    opts = require('./args').parse(),
    settings = require('./settings')();

var logConfig = _.defaults(toStreamsFormat(settings.logging), {name: settings.pkg.name, streams: []});

if (opts.environment === 'DEV') {
    logConfig.streams.push({
        level: 'debug',
        stream: process.stdout
    });
}

// assume all relative paths are relative to the project root,
// expand out to an absolute path so app can be started from anywhere
_.each(logConfig.streams, function(stream) {
    if (stream.path && stream.path.indexOf('/') !== 0) {
        stream.path = path.join(settings.appDir, stream.path);
    }
});

var logger = bunyan.createLogger(logConfig);

if (cluster.isWorker) {
    logger = logger.child({ worker: cluster.worker.id });
}

module.exports = logger;

function toStreamsFormat(logConfig) {
    if (logConfig.streams) return logConfig;

    return {
        name: logConfig.name,
        streams: [_.omit(logConfig, 'name')]
    };
}