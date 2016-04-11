# vbb-find-stations

*vbb-find-stations* provides a **stations search for the Berlin Brandenburg public transport service (VBB)**. It pulls its data from [`vbb-static`](https://github.com/derhuerst/vbb-static).

*Note*: [*vbb-stations-autocomplete*](https://github.com/derhuerst/vbb-stations-autocomplete) devilers the `n` most relevant stations for a query, this module returns all that match the query.

[![npm version](https://img.shields.io/npm/v/vbb-find-stations.svg)](https://www.npmjs.com/package/vbb-find-stations)
[![build status](https://img.shields.io/travis/derhuerst/vbb-find-stations.svg)](https://travis-ci.org/derhuerst/vbb-find-stations)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-find-stations.svg)](https://david-dm.org/derhuerst/vbb-find-stations)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-find-stations.svg)](https://david-dm.org/derhuerst/vbb-find-stations#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-find-stations.svg)


## Installing

```shell
npm install vbb-find-stations
```


## Usage

```javascript
const findStations = require('vbb-find-stations')
findStations('Seestr')
.on('data', console.log)
// {id: 9009103, name: 'U Seestr. (Berlin)'},
// {id: 9009105, name: 'Seestr./Amrumer Str. (Berlin)'},
// {id: 9019103, name: 'Seestr./Beusselstr. (Berlin)'}
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-find-stations/issues).
