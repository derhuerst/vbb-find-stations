'use strict'

const stream = require('stream')
const autocomplete = require('vbb-stations-autocomplete')



const exact = false
const fuzzy = true

const find = (query, filter = exact) => {
	const out = new stream.PassThrough({objectMode: true})

	const stations = autocomplete(query, 100, !!filter, false)
	for (let station of stations) out.write(station)
	out.end()

	return out
}

module.exports = Object.assign(find, {exact, fuzzy})
