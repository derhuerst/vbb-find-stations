'use strict'

const ndjson   = require('ndjson')
const fs       = require('fs')
const path     = require('path')
const common   = require('vbb-common-places').stations
const stations = require('vbb-stations/full.json')
const tokenize = require('vbb-tokenize-station')

const showError = (err) => {
	if (!err) return
	console.error(err.stack)
	process.exit(1)
}



const out = ndjson.stringify()
out.pipe(fs.createWriteStream(path.join(__dirname, 'stations.ndjson')))
.on('error', showError).on('finish', () => console.log('done'))

for (let name in common) {
	const station = stations[common[name]]
	if (!station) {
		console.error('Unknown station', common[name])
		continue
	}
	out.write({
		  id:     station.id
		, name:   station.name
		, tokens: tokenize(name)
	})
}

for (let id in stations) {
	const station = stations[id]
	if (!station) {
		console.error('Unknown station', id)
		continue
	}
	out.write({
		  id:     station.id
		, name:   station.name
		, tokens: tokenize(station.name)
	})
}

out.end()
