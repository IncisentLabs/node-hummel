var defaultOptions = {
    environment: {
        abbr: 'e',
        default: process.env.NODE_ENV || 'DEV',
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
    },

    logs: {
        'abbr': 'l',
        'help': 'file path to write log messages (overrides settings.json)'
    }
};

var _ = require('lodash'),
    logging = require('./lib/logging'),
    settings = require('./lib/settings'),
    parsedOptions;

var getDefaultOpts = _.once(function() {
    return require('nomnom').options(defaultOptions).parse();
});

module.exports = {
    createApp: function(opts) {
        if (!opts) opts = getDefaultOpts();
        parsedOptions = opts;

        return require('./lib/app')(opts, this.getLogger(), this.getSettings());
    },

    getLogger: function(opts) {
        if (!opts) opts = getDefaultOpts();
        parsedOptions = opts;

        return logging(this.getSettings(), parsedOptions);
    },

    getSettings: function(opts) {
        if (!opts) opts = getDefaultOpts();
        parsedOptions = opts;

        return settings.fromEnv(parsedOptions.environment);
    },

    defaultOptions: defaultOptions
};
