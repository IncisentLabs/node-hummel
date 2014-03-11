var settings = require('./../lib/settings');

module.exports = {

    test_merging_env_and_default_settings: function(test) {
        var settingsObj = {
            DEFAULT: {
                mode: 'default'
            },
            DEV: {
                mode: 'dev'
            }
        };

        var packageObj = { name: 'foo' };
        var devSettings = settings.fromObj('DEV', settingsObj, packageObj);

        test.ok(devSettings);
        test.equal(devSettings.pkg.name, 'foo');
        test.equal(devSettings.mode, 'dev');
        test.done();
    }

};