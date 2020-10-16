const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const src = `${__dirname}/postals.csv`
const dest = `${__dirname}/postals-by-region.json`

// header row: AMTS_NR, ADRESSERINGSNAVN, KOMMUNE_NR, ADRESSERINGSNAVN_1, POSTNR, BYNAVN
const data = fs.readFileSync(src).toString()
const records = parse(data, { delimiter: ';' })

// map region to postal
const capital = records.filter(row => row[1] === 'Region Hovedstaden').map(row => parseInt(row[4]))
const zealand = records.filter(row => row[1] === 'Region Sjælland').map(row => parseInt(row[4]))
const middle = records.filter(row => row[1] === 'Region Midtjylland').map(row => parseInt(row[4]))
const north = records.filter(row => row[1] === 'Region Nordjylland').map(row => parseInt(row[4]))
const south = records.filter(row => row[1] === 'Region Syddanmark').map(row => parseInt(row[4]))
const map = { capital, zealand, middle, north, south }
fs.writeFileSync(dest, JSON.stringify(map, null, 2))
