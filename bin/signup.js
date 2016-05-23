var config = require('../lib/config');
var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var async = require('async');
var colors = require('colors')
var client = require('../lib/client');

exports.execute = function(options) {

  var name = options.name;
  var password = options.password;

  if (!name) {
    fatal('user name required');
  }
  if (!password) {
    fatal('password required');
  }

  client.signup(name, password, function(err, body) {
    if (err) {
      fatal(err)
    }
    if (body.code != 200) {
      fatal(body.message)
    }
    console.log('Success:'.green, 'token saved');
    config.set('token', body.data);
  })
}

function fatal(msg) {
  console.log('%s %s', 'Error:'.red, msg);
  process.exit(1);
}