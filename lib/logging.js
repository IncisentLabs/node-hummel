var bunyan = require('bunyan'),
 	syslog = require('bunyan-syslog'),
    mkdirp = require('mkdirp'),
    _ = require('lodash'),
    path = require('path'),
    cluster = require('cluster');

module.exports = function getLogger(settings, options) {
    options = options || {};

    var logConfig = _.defaults(toStreamsFormat(settings.logging), { name: 'default', streams: [] });

    if (settings && settings.logging && settings.logging.syslog_host && settings.logging.syslog_port) {
		logConfig.streams.push({
            level: 'debug',
            type: 'raw',
            stream: syslog.createBunyanStream({
                facility: syslog.local0,
                host: settings.logging.syslog_host,
                port: settings.logging.syslog_port
            })
        })
    }

    if (options.logs) {
        logConfig.streams[0].path = options.logs;
    }

    if (settings.environment === 'DEV') {
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
            mkdirp.sync(path.dirname(stream.path));
        }
    });

    var logger = bunyan.createLogger(logConfig);

    if (cluster.isWorker) {
        logger = logger.child({ worker: cluster.worker.id });
    }

    return logger;
};

function toStreamsFormat(logConfig) {
    if (!logConfig) return {};
    if (logConfig.streams) return logConfig;

    return {
        name: logConfig.name,
        streams: [_.omit(logConfig, 'name')]
    };
}
