Seaport client tool to help to publish packages to server.

Before all. you need to setup your own server, you can find the instruction here: https://github.com/ltebean/seaport-server

##Usage:

Run `seaport -h` to print the usage

```bash
Usage: seaport [options] [command]

Commands:

config [options]       config server address
signup [options]       signup a new user
login [options]        login as existing user
create_app [options]   create an app
info                   list the package info
publish [options]      pack current folder and publish to server
```


After setup the server, make seaport-client point to the server by:
```bash
seaport config -h http://localhost:8080
```

#### Switch profile
Each profile has its own config, you can switch profile by:
```bash
seaport profile -n profileName
```

#### Create a user
```bash
seaport signup -n username -p password
```
Once you create the account, the login token will be saved to your machine, you can use `seaport config` to find the token.

#### Login as existing user
```bash
seaport login -n username -p password
```
Once log in, the token will be saved to your machine, you can use `seaport config` to find the token.

#### Create an app
```bash
seaport create_app -n TestApp
```
After the app is created, the app secret will be saved locally, you can use `seaport config` to find it.

#### Publish the package
```bash
seaport publish -a appName -p packageName -v versionNumber
```

This command will pack the current working directory into a zip file and publish to server

#### List app and package info
```bash
seaport info
```
