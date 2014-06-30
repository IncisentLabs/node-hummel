var hummel = require('hummel'),
    opts = require('nomnom')
        .options(hummel.defaultOptions)
        .option('foo', {
            help: 'an additional custom param'
        })
        .parse();

console.log(JSON.stringify(opts, null, 4));
