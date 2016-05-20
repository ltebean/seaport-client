var config = require('../lib/config');
var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var async = require('async');
var colors = require('colors')
var client = require('../lib/client');

exports.execute = function(options) {

  var name = options.name;

  if (!name) {
    fatal('app name required');
  }

  client.createApp(name, function(err, body) {
    if (err) {
      fatal(err)
    }
    if (body.code != 200) {
      fatal(body.message)
    }
    console.log("Success, app secret saved");
    config.set('secret', body.data);
  })
}

function fatal(msg) {
  console.log('%s %s', 'error:'.red, msg);
  process.exit(1);
}