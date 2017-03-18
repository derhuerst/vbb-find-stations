'use strict'

const test = require('blue-tape')
const so   = require('so')
const find = require('.')

const sink = (stream, input) => new Promise((yay, nay) => {
	const data = []
	stream
	.on('data', (d) => data.push(d))
	.on('error', (err) => nay(err))
	.on('end', () => yay(data))
	stream.write(input)
	stream.end()
})



test('exact: more fragments than tokens', so(function* (t) {
	const s = find.exact(['foo', 'bar'])
	const i = {type: 'station', name: 'Foo', tokens: ['foo']}
	t.deepEqual(yield sink(s, i), [])
}))

test('exact: typo', so(function* (t) {
	const s = find.exact(['foo', 'bar'])
	const i = {type: 'station', name: 'Foo (Baz)', tokens: ['foo', 'baz']}
	t.deepEqual(yield sink(s, i), [])
}))

test('exact: less fragments than tokens', so(function* (t) {
	const s = find.exact(['foo'])
	const i = {type: 'station', name: 'Foo (Bar)', tokens: ['foo', 'bar']}
	t.deepEqual(yield sink(s, i), [i])
}))

test('exact: as many fragments as tokens', so(function* (t) {
	const s = find.exact(['foo', 'bar'])
	const i = {type: 'station', name: 'Foo (Bar)', tokens: ['foo', 'bar']}
	t.deepEqual(yield sink(s, i), [i])
}))



test('fuzzy: 1 fragment, 1 token, distance of 3', so(function* (t) {
	const s = find.fuzzy(['bar'])
	const i = {type: 'station', name: 'Foo', tokens: ['foo']}
	t.deepEqual(yield sink(s, i), [])
}))

test('fuzzy: 1 fragment, 1 token, distance of 2', so(function* (t) {
	const s = find.fuzzy(['bar'])
	const i = {type: 'station', name: 'Buz', tokens: ['buz']}
	const r = yield sink(s, i)
	t.equal(r.length, 1)
	t.equal(r[0].name, i.name)
	t.equal(r[0].tokens, i.tokens)
	t.equal(r[0].relevance, 1/3 + .5/'Buz'.length)
}))

test('fuzzy: 1 fragment, 1 token, distance of 1', so(function* (t) {
	const s = find.fuzzy(['bar'])
	const i = {type: 'station', name: 'Baz', tokens: ['baz']}
	const r = yield sink(s, i)
	t.equal(r.length, 1)
	t.equal(r[0].name, i.name)
	t.equal(r[0].tokens, i.tokens)
	t.equal(r[0].relevance, 1/2 + .5/'Baz'.length)
}))

test('fuzzy: 1 fragment, 1 token, distance of 0', so(function* (t) {
	const s = find.fuzzy(['foo'])
	const i = {type: 'station', name: 'Foo', tokens: ['foo']}
	const r = yield sink(s, i)
	t.equal(r.length, 1)
	t.equal(r[0].name, i.name)
	t.equal(r[0].tokens, i.tokens)
	t.equal(r[0].relevance, 1 + .5/'Foo'.length)
}))



test('find', (t) => {
	t.plan(2)

	find('U Alt-Mareindorf (Berlin)', find.fuzzy) // note the typo
	.on('data', (s) => {
		if (s.id === '900000070301') {
			t.equal(s.type, 'station')
			t.pass('match')
		}
	})
})
