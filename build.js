'use strict'

const path     = require('path')
const stations = require('vbb-stations')
const tokenize = require('vbb-tokenize-station')
const fs       = require('fs')
const map      = require('through2-map')
const ndjson   = require('ndjson')



const showError = (err) => {
	if (!err) return
	console.error(err.stack)
	process.exit(1)
}

const file = path.join(__dirname, 'stations.ndjson')



console.info('Creating a search index from vbb-stations.')

stations('all').on('error', showError)
.pipe(map({objectMode: true}, (station) => ({
	  id:     station.id
	, name:   station.name
	, tokens: tokenize(station.name)
})))
.pipe(ndjson.stringify())
.pipe(fs.createWriteStream(file))
.on('finish', () => console.log('Done.'))
