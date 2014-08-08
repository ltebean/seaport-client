var cradle = require('cradle');
var conf = require('../lib/config');
var config = conf.load();
var async = require('async');
var colors = require('colors');

var options = {};
if (config.username && config.password) {
  options = {
    auth: {
      username: config.username || '',
      password: config.password || ''
    }
  }
}

var db = new(cradle.Connection)('http://' + config.host, config.port, options).database('_users');

exports.execute = function(options) {

  var username = options.username;
  var password = options.password;

  if (!username || !password) {
    fatal('username and password required');
  }

  var userId = 'org.couchdb.user:' + username;

  async.waterfall([

      function addUser(done) {
        db.save(userId, {
            "name": username,
            "type": "user",
            "roles": [],
            "password": password
          },
          function(err, doc) {
            done(err, doc);
          });
      }
    ],
    function(err, result) {
      if (err) {
        fatal(JSON.stringify(err));
      } else {
        conf.set('username', username);
        conf.set('password', password);
        console.log('success');
      }
    });
}

function fatal(msg) {
  console.log('%s %s', 'error:'.red, msg);
  process.exit(1);
}