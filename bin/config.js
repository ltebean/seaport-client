require('console.table');

var config = require('../lib/config');

exports.execute = function(options) {
  options.host && config.set('host', options.host);
  console.table(config.load());
}