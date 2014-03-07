module.exports = {
    createApp: function() {
        return require('./lib/app')();
    },

    settings: require('./lib/settings'),
    log: require('./lib/logging'),
    args: require('./lib/args')
};