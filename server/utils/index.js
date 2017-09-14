const humanizeDuration = require('humanize-duration')
const moment = require('moment')

// Time Stamp Utility function
const timeStamp = (postedDate, lang = 'en') =>
	`${humanizeDuration(moment(postedDate).diff(moment()), {
		language: lang,
		round: true
	})} ago`

// Takees a username/ list of string and returns the first string
const getFirst = str => str.split(' ')[0].toLowerCase()

module.exports = {
	timeStamp,
	getFirst
}
