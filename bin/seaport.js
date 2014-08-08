#!/usr/bin/env node

var program = require('commander');
program.version('0.0.1')

program
  .command('config')
  .description('config server port and address')
  .option('-h, --host [host]', 'server host')
  .option('-p, --port [port]', 'server port')
  .option('-d, --db [db]', 'database name')
  .option('-u, --username [username]', 'username')
  .option('-s, --password [password]', 'password')
  .action(function(options) {
    require('../bin/config').execute({
      host: options.host,
      port: options.port,
      db: options.db,
      username: options.username,
      password: options.password
    });
  });

program
  .command('adduser')
  .description('add a user or update the current account')
  .option('-u, --username [username]', 'username')
  .option('-s, --password [password]', 'password')
  .action(function(options) {
    require('../bin/adduser').execute({
      username: options.username,
      password: options.password
    });
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
      version: options.packageVerion
    });
  });

program
  .command('activate')
  .description('activate a specified version')
  .option('-a, --appName [appName]', 'app name')
  .option('-p, --packageName [packageName]', 'package name')
  .option('-v, --packageVerion [packageVerion]', 'package verion')
  .action(function(options) {
    require('../bin/activate').execute({
      appName: options.appName,
      packageName: options.packageName,
      version: options.packageVerion
    });
  });

program.parse(process.argv);
if (program.args.length === 0) program.help()