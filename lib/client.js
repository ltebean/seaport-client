var config = require('./config').load();
var request = require('request');

exports.info = function(cb) {
	post('/api/v1/app/info', {
		
	}, function(err, body) {
		cb(err, body)
	})
}

exports.signup = function(name, password, cb) {
	post('/api/v1/user/signup', {
		name: name,
		password: password
	}, function(err, body) {
		cb(err, body)
	})
}

exports.login = function(name, password, cb) {
	post('/api/v1/user/login', {
		name: name,
		password: password
	}, function(err, body) {
		cb(err, body)
	})
}


exports.createApp = function(name, cb) {
	post('/api/v1/app', {
		name: name
	}, function(err, body) {
		cb(err, body)
	})
}

exports.publish = function(formData, cb) {
	var url = config.host + '/api/v1/app/package'
	request.post({
		headers: {
			'X-Token': config.token
		},
		url: url,
		formData: formData
	}, function optionalCallback(err, httpResponse, body) {
		cb(err, JSON.parse(body));
	});
}

function post(path, data, cb) {
	var token = config.token;
	var host = config.host;
	var options = {
		headers: {
			'X-Token': config.token
		},
		uri: config.host + path,
		method: 'POST',
		json: data
	};
	request(options, function(err, response, body) {
		cb(err, body);
	});
}