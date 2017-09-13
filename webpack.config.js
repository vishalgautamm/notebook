// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const PATHS = {
	app: path.join(__dirname, 'client'),
	build: path.join(__dirname, '/')
}

module.exports = {
	entry: PATHS.app,
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader'
			},
			{
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					'import-glob-loader'
				],
				test: /\.s?css$/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/index.html'
		})
	]
}
