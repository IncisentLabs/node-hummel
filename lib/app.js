var cluster = require('cluster'),
    express = require('express');

module.exports = function(opts, log, settings) {
    var app = express();

    app.get('/healthcheck', function(req, res) {
        res.send("OK");
    });

    app.run = function() {
        if (cluster.isMaster && opts.workers > 1) {
            for (var i = 1; i <= opts.workers; i++) {
                log.info('Starting worker #' + i);
                cluster.fork();
            }
        } else {
            var port = opts.port || settings.port;

            app.listen(port);

            log.info('Running in ' + settings.environment + ' mode.');
            log.info('Server running on: http://localhost:' + port);
        }
    };

    return app;
};
