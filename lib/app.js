var cluster = require('cluster'),
    express = require('express'),
    args = require('./args'),
    settings = require('./settings'),
    opts = args.parse(),
    log = require('./logging');

module.exports = function() {
    var app = express();

    app.setup = function() {};

    app.run = function() {
        if (cluster.isMaster) {
            for (var i = 0; i < opts.workers; i++) {
                cluster.fork();
            }
        } else {
            app.setup();

            var port = opts.port || settings.port;

            app.listen(port);

            log.info('Running in ' + opts.environment + ' mode.');
            log.info('Server running on: http://localhost:' + port);
        }
    };

    return app;
};
