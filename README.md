[![NPM version shield](https://img.shields.io/npm/v/hjsonify.svg)](https://www.npmjs.com/package/hjsonify)
[![License shield](https://img.shields.io/npm/l/hjsonify.svg)](http://opensource.org/licenses/MIT)

# hjsonify
hjsonify is a browserify transform to require [Human JSON (Hjson)](http://hjson.org/) files.

Require Hjson files in your files just like you would a JSON file.

## Install

```sh
$ npm install hjsonify
```

## Usage

Programatic use with Browserify:
```js
var b = require('browserify')(),
    fs = require('fs'),
    hjsonify = require('hjsonify');

b.add('./app.js');
b.transform(hjsonify);
b.bundle().pipe(fs.createWriteStream('./bundle.js'));
```
CLI use with Browserify:
```sh
$ browserify -t hjsonify app.js > bundle.js
```

## Example

config.hjson:
```hjson
{
  port: 1000 //defaults to 80
}
```

app.js:
```js
var config = require('./config.hjson');
console.log(config.port);
```

```sh
$ browserify -t hjsonify app.js | node
1000
```
