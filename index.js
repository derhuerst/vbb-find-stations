'use strict'

const fs       = require('fs')
const path     = require('path')
const filter   = require('stream-filter')
const through  = require('through2')
const leven    = require('leven')
const tokenize = require('vbb-tokenize-station')
const ndjson   = require('ndjson')
const stream   = require('stream')



const exact = (query) => filter.obj((station) => {
	const tokens = Array.from(station.tokens)
	for (let fragment of query) {
		const i = tokens.indexOf(fragment)
		if (i < 0) {tokens.splice(i, 1); return false}
	}
	return true
})



const fuzzy = (query) => through.obj(function (station, _, cb) {
	const tokens = Array.from(station.tokens)
	let relevance = .5 / station.name.length
	for (let fragment of query) {

		let i = tokens.indexOf(fragment) // try exact matching
		if (i >= 0) {relevance += 1; tokens.splice(i, 1); continue}

		let distance = 3
		for (let j = 0; j < tokens.length; j++) {
			const d = leven(tokens[j], fragment)
			if (d < distance) {distance = d; i = j}
		}
		if (i >= 0) {
			relevance += 1 / (distance + 1)
			tokens.splice(i, 1)
			continue
		}

		return cb() // fragment not found in tokens
	}
	station = Object.assign({relevance}, station)
	this.push(station)
	cb()
})



const find = (query, filter = exact) => {
	query = tokenize(query)
	if (query.length === 0) return empty()
	return fs.createReadStream(path.join(__dirname, 'stations.ndjson'))
	.pipe(ndjson.parse())
	.pipe(filter(query))
}

const empty = () => {
	const s = new stream.PassThrough({objectMode: true})
	s.end()
	return s
}



module.exports = Object.assign(find, {exact, fuzzy})
