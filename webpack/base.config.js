const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target: "web",
    mode: "development",
    entry: {
        bundle: "./src/index.jsx"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].[hash:6].js",
        chunkFilename: "js/[name]Chunk.[chunkhash:6].js"
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: "babel-loader",
            exclude: /node_modules/
        }, {
            test: /\.(gif|jpg|png)\??.*$/,
            loader: "url-loader",
            options: {
                limit: 8192,
                name: "img/[name].[hash:6].[ext]"
            }
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: "url-loader",
            options: {
                limit: 8192,
                name: "font/[name].[hash:6].[ext]"
            }
        },
        {
            test: /\.html$/,
            loader: "html-loader",
            options: {
                minimize: false
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve: {
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    }
};