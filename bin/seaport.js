#!/usr/bin/env node

var program = require('commander');
program.version('0.0.1')

program
  .command('config')
  .description('config server address')
  .option('-h, --host [host]', 'server host')
  .option('-s, --secret [secret]', 'app secret')
  .action(function(options) {
    require('../bin/config').execute({
      host: options.host,
      secret: options.secret
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
  .option('-p, --packageName [packageName]', 'package name')
  .option('-v, --packageVerion [packageVerion]', 'package verion')
  .action(function(options) {
    require('../bin/publish').execute({
      packageName: options.packageName,
      packageVersion: options.packageVerion
    });
  });



program.parse(process.argv);
if (program.args.length === 0) program.help()