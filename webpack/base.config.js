const path = require("path");

module.exports = {
    target: "node",
    module: "development",
    entry: "../src",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.[hash].js",
        chunkFilename: "[chunkhash].js"
        // publicPath: ""
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: "babel-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "../src/index.html"
        })
    ]
};