'use strict';
var fs = require('fs');
var vm = require('vm');
var test = require('tape');
var browserify = require('browserify');
var hjsonify = require('../lib/hjsonify.js');
var Hjson = require('hjson');
var sampleHjson = fs.readFileSync(__dirname + '/fixtures/sample.hjson', {encoding: 'utf-8'});
var sampleObject = Hjson.parse(sampleHjson);

test('transform', function (t) {
	t.plan(1);

	var b = browserify();
	b.add(__dirname + '/fixtures/require.js');
	b.transform(hjsonify);
	b.bundle(function (err, src) {
		if (err) {
			t.fail(err);
			return;
		}
		vm.runInNewContext(src, { test: vmTest });
	});
	function vmTest (testData) {
		t.deepEqual(testData, sampleObject);
	}
});
