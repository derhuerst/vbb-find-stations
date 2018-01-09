'use strict'

const stream = require('stream')
const autocomplete = require('vbb-stations-autocomplete')

let rawData = require('vbb-stations/simple')
const stations = Object.create(null)
for (let s of rawData) stations[s.id] = s
rawData = null

const exact = false
const fuzzy = true

const find = (query, filter = exact) => {
	const out = new stream.Readable({objectMode: true, read: () => {}})

	const results = autocomplete(query, 100, !!filter, false)
	for (let result of results) {
		const station = stations[result.id]
		if (!station) continue

		Object.assign(result, station)
		out.push(result)
	}

	out.push(null)
	return out
}

module.exports = Object.assign(find, {exact, fuzzy})
