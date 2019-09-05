'use strict'

const test = require('tape')
const find = require('.')

test('find – U Alt-Mareindorf', (t) => {
	const res = find('U Alt-Mareindorf', true) // note the typo
	t.ok(res.every(s => s.type === 'station'))
	t.ok(res.some(s => s.id === '900000070301'), 'found 900000070301 U Alt-Mariendorf')
	t.end()
})

test('find – U mehringdamm', (t) => {
	const res = find('U mehringdamm')
	t.ok(res.every(s => s.type === 'station'))
	t.ok(res.some(s => s.id === '900000017101'), 'found 900000017101 U Mehringdamm')
	t.end()
})
