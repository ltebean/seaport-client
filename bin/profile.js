var config = require('../lib/config')
var cp = require('child_process');
var path = require('path');
var fs = require('fs');
var colors = require('colors')
var client = require('../lib/client');
var profile = require('../lib/profile');

exports.execute = function(options) {

  var name = options.name;

  if (!name) {
     console.log('Current profile:', profile.currentProfile());
     return;
  }

  profile.useProfile(name);
  console.log('Switched to profile:', name)

}

