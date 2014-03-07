var hummel = require('hummel'),
    log = hummel.log;

var app = hummel.createApp();

app.get('/', function(req, res) {
    log.debug('It works!');

    res.send('Hello World!');
});

app.run();
