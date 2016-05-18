'use strict'

const a              = require('assert')
const find          = require('./index.js')

let test1 = 0
find('U Berliner Str. (Berlin)')
.on('data', (station) => {
	a.strictEqual(typeof station,    'object')
	a.strictEqual(typeof station.id, 'number')
	a.strictEqual(station.name, 'U Berliner Str. (Berlin)')
	test1++
})
.on('end', () => {
	a.ok(test1 > 0, 'No results.')
})

let test2 = 0
find('U Alt-Mareindorf (Berlin)') // typo
.on('data', (station) => {
	a.strictEqual(typeof station,    'object')
	a.strictEqual(typeof station.id, 'number')
	a.strictEqual(station.name, 'U Alt-Mariendorf (Berlin)')
	test2++
})
.on('end', () => {
	a.ok(test2 > 0, 'No results.')
})
