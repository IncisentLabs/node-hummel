var hummel = require('hummel'),
    opts = require('nomnom')
        .options(hummel.defaultOptions)
        .option('foo', {
            default: 'bar',
            help: 'foo help'
        })
        .parse();

var app = hummel.createApp(opts),
    log = hummel.getLogger();

app.get('/', function(req, res) {
    log.debug('It works!');

    res.send('Hello World!');
});

app.run();
