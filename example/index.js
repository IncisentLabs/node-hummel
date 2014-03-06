var hummel = require('hummel'),
    opts = hummel.args.parse(),
    settings = hummel.settings(opts.environment);

var app = hummel.createApp();

app.get('/', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.json(settings);
});

app.run();
