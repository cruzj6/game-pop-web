const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/react'],
						plugins: ['@babel/plugin-proposal-object-rest-spread'],
					},
				},
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
					},
				},
			},
		],
	},
	entry: ['./src/index.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	node: {
		fs: 'empty',
	},
	optimization: {
		minimize: false,
	},
	devServer: {
		historyApiFallback: true,
	},
};
