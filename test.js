'use strict'

const a              = require('assert')
const find          = require('./index.js')

let results = 0

find('U Berliner Str. (Berlin)')
.on('data', (station) => {
	a.strictEqual(typeof station,    'object')
	a.strictEqual(typeof station.id, 'number')
	a.strictEqual(station.name, 'U Berliner Str. (Berlin)')
	results++
})
.on('end', () => {
	a.ok(results > 0, 'No results.')
})
