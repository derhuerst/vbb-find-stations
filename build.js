'use strict'

const through  = require('through2')
const stations = require('vbb-stations')
const tokenize = require('vbb-tokenize-station')
const common   = require('vbb-common-places').stations
const map      = require('through2-map')
const merge    = require('merge-stream')
const ndjson   = require('ndjson')
const fs       = require('fs')
const path     = require('path')

const showError = (err) => {
	if (!err) return
	console.error(err.stack)
	process.exit(1)
}



// vbb-common-places
const a = through.obj(function (alias, _, cb) {
	const self = this
	stations(alias.id).on('error', cb)
	.on('data', (station) => self.push({
		  id:     station.id
		, name:   station.name
		, tokens: tokenize(alias.name)
	}))
	.on('end', () => cb())
}).on('error', showError)
for (let name in common) {a.write({name, id: common[name]})}
a.end()

// vbb-stations
const b = stations('all').on('error', showError)
.pipe(map({objectMode: true}, (station) => ({
	  id:     station.id
	, name:   station.name
	, tokens: tokenize(station.name)
})))



merge(a, b)
.pipe(ndjson.stringify())
.pipe(fs.createWriteStream(path.join(__dirname, 'stations.ndjson')))
.on('finish', () => console.log('done'))
