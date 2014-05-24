var config = require('../lib/config');

exports.execute=function(options){
	options.host && config.set('host',options.host);
	options.port && config.set('port',options.port);
	options.db && config.set('db',options.db);
	console.log('current config: %s',JSON.stringify(config.load()));
}