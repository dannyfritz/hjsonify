'use strict';
var fs = require('fs');
var path = require('path');
var transformTools = require('browserify-transform-tools');
var Hjson = require('hjson');

function endsWith (str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function processHjsonFile (filepath) {
	var hjsontext = fs.readFileSync(filepath, {encoding: 'utf8'});
	var hjsonData = Hjson.parse(hjsontext);
	return JSON.stringify(hjsonData);
}
module.exports = transformTools.makeRequireTransform(
	'hjsonify',
	{evaluateArguments: true},
	function(args, opts, cb) {
		var filename = args[0];
		var cwd = path.dirname(opts.file);
		var filepath = path.join(cwd, filename);
		if (!endsWith(filename, '.hjson')) {
		return cb(null);
		}
		return cb(null, processHjsonFile(filepath));
	}
);
