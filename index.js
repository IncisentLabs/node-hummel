module.exports = {
    createApp: function() {
        return require('./lib/app')();
    },

    settings: require('./lib/settings'),
    logging: require('./lib/logging'),
    args: require('./lib/args')
};