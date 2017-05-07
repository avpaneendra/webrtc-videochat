const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        app: "./dev/src/boot.ts",
        polyfill: "./dev/src/polyfill.ts"
    },
    output: {
        filename: "./public/[name].js"
    },
    module: {
		    rules: [
					{
						test: /\.css$/,
						use: [ 'style-loader', 'css-loader' ],
						
					},
						  
					{
						test: /\.ts$/,
						use: 'awesome-typescript-loader',
						exclude: /node_modules/
					}
        
				]	

    },
	plugins: [new UglifyJSPlugin(),
			new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})],
    resolve: {
        extensions: [".js", ".ts", ".css"]
    }
}