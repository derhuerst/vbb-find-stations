'use strict'

const autocomplete = require('vbb-stations-autocomplete')

let rawData = require('vbb-stations/simple')
const stations = Object.create(null)
for (let s of rawData) stations[s.id] = s
rawData = null

const findStations = (query, fuzzy = false) => {
	return autocomplete(query, 100, fuzzy, false)
	.filter(res => !!stations[res.id])
	.map(res => ({...res, ...stations[res.id]}))
}

module.exports = findStations
