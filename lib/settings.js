var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var pkg = requireProjectFile('package.json'),
    settings = requireProjectFile('settings.json');

module.exports = function(env) {
    if (!env) env = process.env.NODE_ENV || 'DEV';

    return _.extend({
        pkg: pkg,
        environment: env,
        appDir: path.dirname(require.main.filename)
    }, settings['DEFAULT'], settings[env]);
};

function requireProjectFile(filename) {
    if (require.main === module) {
        throw new Error('hummel: settings should be required, not run as main.');
    }

    var appDir = path.dirname(require.main.filename),
        absPath = path.join(appDir, filename);

    try {
        fs.statSync(absPath)
    } catch (e) {
        return null;
    }

    return require(absPath);
}
