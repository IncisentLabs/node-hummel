var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var DEFAULT_SETTINGS = { DEFAULT: {} };

var projectPackage = requireProjectFile('package.json'),
    projectSettings = requireProjectFile('settings.json') || DEFAULT_SETTINGS;

module.exports = {
    fromEnv: function(env) {
        if (!env) env = process.env.NODE_ENV || 'DEV';

        return mergeSettings(env, projectSettings, projectPackage);
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
        absPath = path.join(appDir || '', filename),
        requiredModule;

    try {
        fs.statSync(absPath);
    } catch (e) {
        return null;
    }

    try {
        requiredModule = require(absPath);
    } catch (e) {
        return null;
    }

    return requiredModule;
}
