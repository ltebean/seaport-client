var config = require('../lib/config');

exports.execute=function(options){
	options.host && config.set('host',options.host);
	options.port && config.set('port',options.port);
	console.log('current config: %s',JSON.stringify(config.load()));
}