var args = require('./args');
var settings = require('./settings');
var opts = args.parse();

var cluster = require('cluster'),
    express = require('express');

var app = express();

app.start = function() {};

if (cluster.isMaster) {
    for (var i = 0; i < opts.workers; i++) {
        cluster.fork();
    }
} else {
    app.start();
}
