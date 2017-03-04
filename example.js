'use strict'

const findStations = require('.')

findStations('U Steglitz')
.on('data', (s) => console.log(s.id, s.name))
