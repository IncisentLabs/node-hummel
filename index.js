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
    settings = require('./lib/settings');

var getDefaultOpts = _.once(function(opts) {
    return opts || require('nomnom').options(defaultOptions).parse();
});

module.exports = {

    getLogger: function(opts) {
        opts = _.defaults(opts || {}, getDefaultOpts(opts));

        return logging(this.getSettings(), opts);
    },

    getSettings: function(opts) {
        opts = _.defaults(opts || {}, getDefaultOpts(opts));

        return settings.fromEnv(opts.environment);
    },

    getOptions: function(opts) {
        return _.defaults(opts || {}, getDefaultOpts(opts));
    },

    defaultOptions: defaultOptions
};
