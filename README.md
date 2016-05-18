Seaport client tool to help to publish packages to server

##Usage:
Run `seaport` to find the usage
```bash
Usage: seaport [options] [command]

Commands:

config [options]       config server address
info                   list the package info
publish [options]      package current folder and publish to server
```

Before all. you need to setup your own server and create the app, you can find the instruction here: https://github.com/ltebean/seaport-server

After setup the server, make seaport-client point to the server by:
```bash
seaport config -h http://localhost:8080 -s appSecret
```
