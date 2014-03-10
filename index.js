var defaultOptions = {
    environment: {
        abbr: 'e',
        default: 'DEV',
        help: "runtime mode the for application"
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

var logger, settings;

module.exports = {
    createApp: function(opts) {
        settings = require('./lib/settings')(opts.environment);
        logger = require('./lib/logging')(settings);

        return require('./lib/app')(opts, logger, settings);
    },

    getLogger: function() {
        return logger;
    },

    getSettings: function() {
        return settings;
    },

    defaultOptions: defaultOptions
};
