var defaultOptions = {
    environment: {
        abbr: 'e',
        default: process.env.NODE_ENV,
        callback: function(env) {
            process.env.NODE_ENV = env;
        },
        help: "runtime mode the for application, overrides NODE_ENV"
    },

    workers: {
        abbr: 'w',
        default: 1,
        help: 'number of workers to run with cluster module'
    },

    port: {
        abbr: 'p',
        default: 8000,
        help: 'port to run on'
    }
};

var logging = require('./lib/logging'),
    settings = require('./lib/settings');

module.exports = {
    createApp: function(opts) {
        var envSettings = settings.fromEnv(opts.environment);
        var logger = logging(envSettings);

        return require('./lib/app')(opts, logger, envSettings);
    },

    getLogger: function() {
        return logging();
    },

    getSettings: function() {
        return settings.fromEnv();
    },

    defaultOptions: defaultOptions,
    settings: settings,
    logging: logging
};
