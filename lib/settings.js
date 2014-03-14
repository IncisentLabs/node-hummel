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
        appDir: getProjectRoot()
    }, settings['DEFAULT'], settings[env]);
}

function getProjectRoot() {
    var root = path.dirname(require.main.filename),
        filename = 'package.json',
        absPath = path.join(root, filename),
        fileExists = false;

    while (!fileExists) {
        try {
            fs.statSync(absPath);
            fileExists = true;
        } catch (e) {
            root = path.dirname(root);
            absPath = path.join(root, filename);

            if (root === '/') return null;
        }
    }

    return root;
}

function requireProjectFile(filename) {
    if (require.main === module) {
        throw new Error('hummel: settings should be required, not run as main.');
    }

    var appDir = getProjectRoot(),
        absPath = path.join(appDir, filename);

    try {
        fs.statSync(absPath);
    } catch (e) {
        return null;
    }

    return require(absPath);
}
