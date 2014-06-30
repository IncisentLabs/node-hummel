var hummel = require('./../index');

module.exports = {

    test_getting_default_settings: function(test) {
        var devSettings = hummel.getSettings();

        test.ok(devSettings);
        test.equal(devSettings.environment, 'DEV');
        test.done();
    },

    test_getting_configured_logger: function(test) {
        var logger = hummel.getLogger();

        test.ok(logger);
        test.equal(logger.streams.length, 1);
        test.done();
    }

};