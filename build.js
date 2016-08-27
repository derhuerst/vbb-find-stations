'use strict'

const ndjson   = require('ndjson')
const fs       = require('fs')
const path     = require('path')
const common   = require('vbb-common-places').stations
const stations = require('vbb-stations')
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
	const station = stations(common[name])[0]
	out.write({
		  id:     station.id
		, name:   station.name
		, tokens: tokenize(name)
	})
}

for (let station of stations('all'))
	out.write({
		  id:     station.id
		, name:   station.name
		, tokens: tokenize(station.name)
	})
