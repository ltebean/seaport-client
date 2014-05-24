var fs = require('fs');
var path=require('path');

function initIfNeeded() {
	var home = getSeaportHome();
	if (!fs.existsSync(home)) {
		fs.mkdirSync(home);
		fs.writeFileSync(path.join(home,'config.json'), JSON.stringify({
			host: '223.4.15.141',
			port: 9984,
			db:'seaport'
		}));
	}
}

function getSeaportHome() {
	var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
	return path.join(home,'.seaport');
}

function set(key, value) {
	var config = load();
	config[key] = value;
	save(config);
}

function get(key) {
	return load()[key];
}

function load() {
	initIfNeeded();
	var configPath=path.join(getSeaportHome(),'config.json');
	if (fs.existsSync(configPath)) {
		return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	} else {
		return {};
	}
}

function save(config) {
	initIfNeeded();
	fs.writeFileSync(path.join(getSeaportHome(),'config.json'), JSON.stringify(config));
}

module.exports = {
	set: set,
	get: get,
	load: load,
	save: save,
	home: getSeaportHome
};