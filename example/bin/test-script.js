var hummel = require('hummel'),
    opts = require('nomnom')
        .options(hummel.defaultOptions)
        .option('foo', {
            help: 'an additional custom param'
        })
        .parse();

var log = hummel.getLogger();

log.debug(opts);
