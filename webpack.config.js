const path = require('path');

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
						use: 'ts-loader',
						exclude: /node_modules/
					}
        
				]	

    },
    resolve: {
        extensions: [".js", ".ts", ".css"]
    }
}