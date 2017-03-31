'use strict'

const test = require('tape')
const find = require('.')

test('find – U Alt-Mareindorf', (t) => {
	find('U Alt-Mareindorf', find.fuzzy) // note the typo
	.on('data', (s) => {
		t.equal(s.type, 'station')
		if (s.id === '900000070301') {
			t.pass('match')
			t.end()
		}
	})
})

test('find – U mehringdamm', (t) => {
	find('U mehringdamm', find.exact)
	.on('data', (s) => {
		t.equal(s.type, 'station')
		if (s.id === '900000017101') {
			t.pass('match')
			t.end()
		}
	})
})
