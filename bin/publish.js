var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var async = require('async');
var colors = require('colors')
var request = require('request');
var config = require('../lib/config').load();
var client = require('../lib/client');

exports.execute = function(options) {

  var host = config.host;
  var secret = config.secret;
  var packageName = options.packageName;
  var packageVersion = options.packageVersion;

  if (!host) {
    fatal('server host required');
  }

  if (!secret) {
    fatal('app secret required');
  }

  if (!packageVersion) {
    fatal('verion required');
  }

  if (!packageName) {
    fatal('packageName required');
  }


  var zipName = generateZipName(packageName, packageVersion);
  var zipPath = path.join(process.cwd(), zipName);

  async.waterfall([

    function zipFiles(done) {
      console.log('Packaging %s ...', zipName);
      zip(process.cwd(), zipPath, function(err) {
        done(err);
      });
    },
    function postFile(done) {
      var formData = {
        // Pass a simple key-value pair
        secret: secret,
        packageName: packageName,
        packageVersion: packageVersion,
        file: fs.createReadStream(zipPath),
      };
      client.publish(formData, function(err, body) {
        fs.unlinkSync(zipPath);
        done(err, body);
      })
    },
  ], function(err, body) {
    if (err) {
      fatal(JSON.stringify(err));
    }
    if (body.code != 200) {
      fatal(body.message);
    }
    console.log(body.message);
  });
}

function fatal(msg) {
  console.log('%s %s', 'error:'.red, msg);
  process.exit(1);
}


function generateZipName(packageName, version) {
  return packageName + '-' + version + '.zip';
}

function zip(root, zipPath, cb) {
  var command = 'zip -r ' + zipPath + ' ' + '*'.replace(' ', '\\ ');
  var zip = cp.exec(command, []);
  zip.on('exit', function(code) {
    if (code == 0) {
      return cb(null);
    } else {
      return cb(new Error('zip error'));
    }
  });
}