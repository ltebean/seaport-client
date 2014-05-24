var cradle = require('cradle');
var config = require('../lib/config').load();
var async = require('async');
var colors = require('colors')

var db = new(cradle.Connection)('http://' + config.host, config.port).database('seaport');

exports.execute = function(options) {

	var appName = options.appName;
	var packageName = options.packageName;
	var version = options.version;

	if (!appName) {
		fatal('app name required');
	}

	if (!packageName) {
		fatal('package name required');
	}

	if (!version) {
		fatal('verion required');
	}

	async.waterfall([

		function loadPackage(done) {
			console.log('loading package ...');

			db.view('app/byApp', {
				key: appName
			}, function(err, docs) {
				for (var i = docs.length - 1; i >= 0; i--) {
					if (docs[i].value.name == packageName) {
						return done(null, docs[i]);
					}
				};
				done(new Error('package not found'))
			});
		},
		function update(doc, done) {
			console.log('activate version %s ...', version);
			db.merge(doc.id, {
				activeVersion: version
			}, function(err, res) {
				done(err, res);
			});
		}
	], function(err, result) {
		if (err) {
			fatal(err.message);
		} else {
			console.log('success')
		}
	});
}

function fatal(msg) {
	console.log('%s %s', 'error:'.red, msg);
	process.exit(1);
}