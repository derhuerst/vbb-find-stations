'use strict'

const test = require('blue-tape')
const so   = require('so')
const find = require('./index')

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
	const i = {tokens: ['foo']}
	t.deepEqual(yield sink(s, i), [])
}))

test('exact: typo', so(function* (t) {
	const s = find.exact(['foo', 'bar'])
	const i = {tokens: ['foo', 'baz']}
	t.deepEqual(yield sink(s, i), [])
}))

test('exact: less fragments than tokens', so(function* (t) {
	const s = find.exact(['foo'])
	const i = {tokens: ['foo', 'bar']}
	t.deepEqual(yield sink(s, i), [i])
}))

test('exact: as many fragments as tokens', so(function* (t) {
	const s = find.exact(['foo', 'bar'])
	const i = {tokens: ['foo', 'bar']}
	t.deepEqual(yield sink(s, i), [i])
}))



test('fuzzy: 1 fragment, 1 token, distance of 3', so(function* (t) {
	const s = find.fuzzy(['bar'])
	const i = {tokens: ['foo']}
	t.deepEqual(yield sink(s, i), [])
}))

test('fuzzy: 1 fragment, 1 token, distance of 2', so(function* (t) {
	const s = find.fuzzy(['bar'])
	const i = {tokens: ['buz']}
	const r = yield sink(s, i)
	t.equal(r.length, 1)
	t.deepEqual(r[0].__proto__, i)
	t.equal(r[0].relevance, 1/3)
}))

test('fuzzy: 1 fragment, 1 token, distance of 1', so(function* (t) {
	const s = find.fuzzy(['bar'])
	const i = {tokens: ['baz']}
	const r = yield sink(s, i)
	t.equal(r.length, 1)
	t.deepEqual(r[0].__proto__, i)
	t.equal(r[0].relevance, 1/2)
}))

test('fuzzy: 1 fragment, 1 token, distance of 0', so(function* (t) {
	const s = find.fuzzy(['foo'])
	const i = {tokens: ['foo']}
	const r = yield sink(s, i)
	t.equal(r.length, 1)
	t.deepEqual(r[0].__proto__, i)
	t.equal(r[0].relevance, 1)
}))



test('find', (t) => {
	t.plan(1)

	find('U Alt-Mareindorf (Berlin)', find.fuzzy) // typo
	.on('data', (s) => {
		if (s.id === 9070301)
		t.pass('match')
	})
})
