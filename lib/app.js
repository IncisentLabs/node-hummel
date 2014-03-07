var cluster = require('cluster'),
    express = require('express'),
    opts = require('./args').parse(),
    settings = require('./settings')(),
    log = require('./logging');

module.exports = function() {
    var app = express();

    app.run = function() {
        if (cluster.isMaster) {
            for (var i = 1; i <= opts.workers; i++) {
                log.info('Starting worker #' + i);
                cluster.fork();
            }
        } else {
            var port = opts.port || settings.port;

            app.listen(port);

            log.info('Running in ' + opts.environment + ' mode.');
            log.info('Server running on: http://localhost:' + port);
        }
    };

    return app;
};
