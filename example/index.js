var hummel = require('hummel');

var app = hummel.createApp(),
    log = hummel.getLogger();

app.get('/', function(req, res) {
    log.debug('It works!');

    res.send('Hello World!');
});

log.info('NODE_ENV=' + process.env.NODE_ENV);

app.run();
