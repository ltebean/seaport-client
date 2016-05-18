var config = require('../lib/config').load();
var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var async = require('async');
var colors = require('colors')
var request = require('request');

require('console.table');

exports.execute = function(options) {

  var host = config.host;
  var secret = config.secret;
  var options = {
    uri: host + '/api/v1/app/info',
    method: 'POST',
    json: {
      "secret": secret
    }
  };

  request(options, function(err, response, body) {
    if (err) {
      fatal(err)
    } 
    console.table(body.map(function(pkg){
      return {
        package: pkg.name,
        version: pkg.version,
        url: pkg.url
      }
    }))
  });


}

function fatal(msg) {
  console.log('%s %s', 'error:'.red, msg);
  process.exit(1);
}