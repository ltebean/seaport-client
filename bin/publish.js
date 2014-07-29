var cradle = require('cradle');
var config = require('../lib/config').load();
var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var async = require('async');
var colors = require('colors')

var db = new(cradle.Connection)('http://' + config.host, config.port, {
  auth: {
    username: config.username,
    password: config.password
  }
}).database(config.db);


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

  var zipName = generateZipName(packageName, version);
  var zipPath = path.join(process.cwd(), zipName);

  async.waterfall([

    function zipFiles(done) {
      console.log('packaging %s ...', zipName);
      zip(process.cwd(), zipPath, function(err) {
        done(err);
      });
    },
    function loadPackage(done) {
      db.view('app/byApp', {
        key: appName
      }, function(err, docs) {
        if(err){
          return done(err);
        }
        for (var i = docs.length - 1; i >= 0; i--) {
          if (docs[i].value.name == packageName) {
            return done(null, docs[i]);
          }
        };
        // if not found, init the package
        console.log('init package ...')
        initPackage({
          name: packageName,
          app: appName,
          activeVersion: version
        }, function(err, doc) {
          return done(err, doc);
        });
      });
    },
    function getDoc(doc, done) {
      db.get(doc.id, function(err, doc) {
        done(err, doc);
      });
    },
    function uploadZip(doc, done) {
      //console.log(doc)
      console.log('uploading zip ...');

      var attachmentData = {
        name: zipName,
        'Content-Type': 'application/zip'
      };
      var idAndRevData = {
        id: doc._id,
        rev: doc._rev
      }
      var readStream = fs.createReadStream(zipPath)

      var writeStream = db.saveAttachment(idAndRevData, attachmentData, function(err, reply) {
        done(err);
      })
      readStream.pipe(writeStream)
    },
    function removeZip(done) {
      fs.unlinkSync(zipPath);
      done(null);
    }
  ], function(err, result) {
    if (err) {
      fs.unlinkSync(zipPath);
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

function initPackage(doc, cb) {
  db.save(doc, function(err, res) {
    cb(err, res);
  });
}

function generateZipName(packageName, version) {
  return packageName + '-' + version + '.zip';
}

function zip(root, zipPath, cb) {
  var command = 'zip -r ' + zipPath + ' ' + '*'.replace(' ', '\\ ');
  var zip = cp.exec(command, []);
  console.log(command)
  zip.on('exit', function(code) {
    if (code == 0) {
      return cb(null);
    } else {
      return cb(new Error('zip error'));
    }
  });
}