const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: __dirname + '/dist/index.html',
			inject: false 
		})
	],
	devServer: {
		contentBase: './dist',
		port: 3001,
		hot: true,
		open: true,
		clientLogLevel: 'silent'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			}
		]
	},
	devtool: 'eval-cheap-module-source-map'
};