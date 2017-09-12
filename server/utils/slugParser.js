const slugParser = title =>
	title
		.split(' ')
		.map(str => str.toLowerCase())
		.reduce((acc, curr) => `${acc}-${curr}`, '')
		.slice(1)

module.exports = slugParser
