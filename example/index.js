var hummel = require('hummel'),
    opts = hummel.args.parse(),
    settings = hummel.settings(opts.mode);

console.log(opts);
console.log(settings);