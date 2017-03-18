# vbb-find-stations

*vbb-find-stations* provides a **stations search for the Berlin Brandenburg public transport service (VBB)**. It pulls its data from [`vbb-static`](https://github.com/derhuerst/vbb-static).

*Note*: [*vbb-stations-autocomplete*](https://github.com/derhuerst/vbb-stations-autocomplete) devilers the `n` most relevant stations for a query, this module returns all that match the query.

[![npm version](https://img.shields.io/npm/v/vbb-find-stations.svg)](https://www.npmjs.com/package/vbb-find-stations)
[![build status](https://img.shields.io/travis/derhuerst/vbb-find-stations.svg)](https://travis-ci.org/derhuerst/vbb-find-stations)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-find-stations.svg)](https://david-dm.org/derhuerst/vbb-find-stations)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-find-stations.svg)](https://david-dm.org/derhuerst/vbb-find-stations#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-find-stations.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)


## Installing

```shell
npm install vbb-find-stations
```


## Usage

```javascript
const findStations = require('vbb-find-stations')
```

This module accepts a filter function (that filters all stations by the first argument) as the second argument. `findStations.exact` and `findStations.fuzzy` are included, with `findStations.exact` being the default one.

```javascript
findStations('U Steglitz')
.on('data', console.log)
```

The stream emits stations in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
{
	type: 'station',
	id: '900000062202',
	name: 'S+U Rathaus Steglitz (Berlin)',
	tokens: ['sbahn', 'ubahn', 'rathaus', 'steglitz', 'berlin']
}
{
	type: 'station',
	id: '900000062282',
	name: 'S+U Rathaus Steglitz/Kreisel (Berlin)',
	tokens: ['sbahn', 'ubahn', 'rathaus', 'steglitz', 'kreisel', 'berlin']
}
{
	type: 'station',
	id: '900000062781',
	name: 'S+U Rathaus Steglitz (Berlin) [U9]',
	tokens: ['sbahn', 'ubahn', 'rathaus', 'steglitz', 'berlin', 'u9']
}
{
	type: 'station',
	id: '900000062782',
	name: 'S+U Rathaus Steglitz (Berlin) [Bus Schloßstr.]',
	tokens: ['sbahn', 'ubahn', 'rathaus', 'steglitz', 'berlin', 'bus', 'schloss', 'strasse']
}
{
	type: 'station',
	id: '900000062784',
	name: 'S+U Rathaus Steglitz (Berlin) [Bus Albrechtstr.]',
	tokens: ['sbahn', 'ubahn', 'rathaus', 'steglitz', 'berlin', 'bus', 'albrecht', 'strasse']
}
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-find-stations/issues).
