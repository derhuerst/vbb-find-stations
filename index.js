'use strict'

const path     = require('path')
const tokenize = require('vbb-tokenize-station')
const fs       = require('fs')
const ndjson   = require('ndjson')
const filter   = require('stream-filter')



const file = path.join(__dirname, 'stations.ndjson')

// naming:
// - a fragment is a part of a search query
// - a token is a part of a stations' name
// - a result is a triple of station, relevance & weight



const match = (query) => {
	const fragments = tokenize(query)
	if (fragments.length === 0) return () => false
	return (station) => {
		for (let fragment of fragments) {
			if (station.tokens.indexOf(fragment) < 0)
				return false
		}
		return true
	}
}

const find = function (query) {
	const results = []
	const fragments = tokenize(query)
	if (fragments.length === 0) return []

	return fs.createReadStream(file)
	.pipe(ndjson.parse())
	.pipe(filter(match(query)))
}

module.exports = Object.assign(find, {match})
