'use strict';
var path = require('path');
var fsp = require('fs-promise');
var transformTools = require('browserify-transform-tools');
var Hjson = require('hjson');

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
module.exports = transformTools.makeRequireTransform(
	'hjsonify',
	{evaluateArguments: true},
	function(args, opts, cb) {
		var filename = args[0];
		if (endsWith(filename, '.hjson')) {
			var cwd = path.dirname(opts.file);
			var filepath = path.join(cwd, filename);
			fsp.readFile(filepath, {encoding: 'utf8'})
			.then(function (hjsontext) {
				var hjsonData = Hjson.parse(hjsontext);
				var jsonString = JSON.stringify(hjsonData);
				cb(null, jsonString);
			}, function (error) {
				cb(error);
			});
			return;
		}
		return cb();
	}
);
