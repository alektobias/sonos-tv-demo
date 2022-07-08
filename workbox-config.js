module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{json,yml,png,html,md,txt,ts,css,eot,ttf,woff,woff2,svg,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
