const humanizeDuration = require('humanize-duration')
const moment = require('moment')

// Time Stamp Utility function
const timeStamp = (postedDate, lang = 'en') =>
	`${humanizeDuration(moment(postedDate).diff(moment()), {
		language: lang,
		round: true
	})} ago`

module.exports = timeStamp

const date = '2017-09-10T18:01:48.349Z'
console.log(timeStamp(date))
