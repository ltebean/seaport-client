#!/usr/bin/env node

var program = require('commander');
program.version('0.0.1')

program
  .command('profile')
  .description('switch to profile')
  .option('-n, --name [name]', 'profile name')
  .action(function(options) {
    require('../bin/profile').execute({
       name: options.name
    });
  });

program
  .command('config')
  .description('config server address')
  .option('-h, --host [host]', 'server host')
  .action(function(options) {
    require('../bin/config').execute({
      host: options.host,
    });
  });

program
  .command('signup')
  .description('signup a new user')
  .option('-u, --name [name]', 'user name')
  .option('-p, --password [password]', 'password')
  .action(function(options) {
    require('../bin/signup').execute({
      name: options.name,
      password: options.password
    });
  });

program
  .command('login')
  .description('login as existing user')
  .option('-u, --name [name]', 'user name')
  .option('-p, --password [password]', 'password')
  .action(function(options) {
    require('../bin/login').execute({
      name: options.name,
      password: options.password
    });
  });

program
  .command('create_app')
  .description('create an app')
  .option('-n, --name [name]', 'app name')
  .action(function(options) {
    require('../bin/createApp').execute({
      name: options.name,
    });
  });

program
  .command('info')
  .description('list the package info')
  .action(function(options) {
    require('../bin/info').execute({});
  });

program
  .command('publish')
  .description('package current folder and publish to server')
  .option('-a, --appName [appName]', 'app name')
  .option('-p, --packageName [packageName]', 'package name')
  .option('-v, --packageVerion [packageVerion]', 'package verion')
  .action(function(options) {
    require('../bin/publish').execute({
      appName: options.appName,
      packageName: options.packageName,
      packageVersion: options.packageVerion
    });
  });



program.parse(process.argv);
if (program.args.length === 0) program.help()