'use strict'

const findStations = require('.')

findStations('U Steglitz')
.on('data', console.log)
