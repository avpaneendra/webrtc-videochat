

module.exports = {
    entry: {
        app: "./dev/src/boot.ts",
        polyfill: "./dev/src/polyfill.ts"
    },
    output: {
        filename: "./public/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    }
}