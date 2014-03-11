var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var projectPackage = requireProjectFile('package.json'),
    projectSettings = requireProjectFile('settings.json');

module.exports = {
    fromEnv: function(env) {
        if (!env) env = process.env.NODE_ENV || 'DEV';

        return mergeSettings(env, projectSettings, projectPackage);
    },

    fromObj: function(env, settingsObj, packageObj) {
        return mergeSettings(env, settingsObj, packageObj);
    }
};

function mergeSettings(env, settings, pkg) {
    return _.extend({
        pkg: pkg,
        environment: env,
        appDir: path.dirname(require.main.filename)
    }, settings['DEFAULT'], settings[env]);
}

function requireProjectFile(filename) {
    if (require.main === module) {
        throw new Error('hummel: settings should be required, not run as main.');
    }

    var appDir = path.dirname(require.main.filename),
        absPath = path.join(appDir, filename),
        fileExists = false;

    while (!fileExists) {
        console.log(absPath);

        try {
            fs.statSync(absPath);
            fileExists = true;
        } catch (e) {
            appDir = path.dirname(appDir);
            absPath = path.join(appDir, filename);

            if (appDir === '/') return null;
        }
    }

    return require(absPath);
}
