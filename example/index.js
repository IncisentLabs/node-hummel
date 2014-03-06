var hummel = require('hummel'),
    settings = hummel.settings();

var app = hummel.createApp();

app.get('/', function(req, res) {
    delete settings.logging;
    res.set('Content-Type', 'application/json');
    res.json(settings);
});

app.run();
