# vbb-find-stations

**Find stations of Berlin Brandenburg public transport service (VBB).** This module is only a wrapper around [`vbb-stations-autocomplete`](https://github.com/derhuerst/vbb-stations-autocomplete).

[![npm version](https://img.shields.io/npm/v/vbb-find-stations.svg)](https://www.npmjs.com/package/vbb-find-stations)
[![build status](https://img.shields.io/travis/derhuerst/vbb-find-stations.svg)](https://travis-ci.org/derhuerst/vbb-find-stations)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-find-stations.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install vbb-find-stations
```


## Usage

```javascript
const findStations = require('vbb-find-stations')

console.log(findStations('U Steglitz'))
```

`findStations` returns [*Friendly Public Transport Format* 1.2.1](https://github.com/public-transport/friendly-public-transport-format/blob/1.2.1/spec/readme.md) `station`s.

```js
[ {
	type: 'station',
	id: '900000062202',
	name: 'S+U Rathaus Steglitz (Berlin)',
	location: {
		type: 'location',
		latitude: 52.455066,
		longitude: 13.322152
	},
	weight: 2736,
	relevance: 3.1185246962418125,
	score: 43.61687553989209
}, {
	type: 'station',
	id: '900000062781',
	name: 'S+U Rathaus Steglitz (Berlin) [U9]',
	location: {
		type: 'location',
		latitude: 52.456438,
		longitude: 13.319986
	},
	weight: 2831.5,
	relevance: 2.4948197569934503,
	score: 35.294851852317365
}, {
	type: 'station',
	id: '900000062782',
	name: 'S+U Rathaus Steglitz (Berlin) [Bus Schloßstr.]',
	location: {
		type: 'location',
		latitude: 52.456755,
		longitude: 13.320584
	},
	weight: 4831.25,
	relevance: 2.0790164641612083,
	score: 35.14615060514675
}, {
	type: 'station',
	id: '900000062282',
	name: 'S+U Rathaus Steglitz/Kreisel (Berlin)',
	location: {
		type: 'location',
		latitude: 52.455889,
		longitude: 13.320852
	},
	weight: 2563.75,
	relevance: 2.4948197569934503,
	score: 34.14531045766747
}, {
	type: 'station',
	id: '900000062784',
	name: 'S+U Rathaus Steglitz (Berlin) [Bus Albrechtstr.]',
	location: {
		type: 'location',
		latitude: 52.45668,
		longitude: 13.321685
	},
	weight: 2834,
	relevance: 2.0790164641612083,
	score: 29.421030297346405
} ]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-find-stations/issues).
