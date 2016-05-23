var config = require('../lib/config').load();
var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var async = require('async');
var colors = require('colors')
var client = require('../lib/client');
require('console.table');

exports.execute = function(options) {

  client.info(function(err, body) {
    if (err) {
      fatal(err)
    }
    if (body.code != 200) {
      fatal(body.message)
    }

    var apps = body.data
    apps.forEach(function(app) {
      console.log('App name: %s secret %s'.green, app.name, app.secret);
      console.table(app.packages.map(function(pkg) {
        return {
          package: pkg.name,
          version: pkg.version,
          url: pkg.url
        }
      }))
    })
  })
}

function fatal(msg) {
  console.log('%s %s', 'Error:'.red, msg);
  process.exit(1);
}