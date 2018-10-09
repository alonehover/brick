const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const BaseConfig = require("./base.config");

const ProdConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8001
    },
    output: {
        ...BaseConfig.output,
        publicPath: ""
    },
    module: {
        rules: [
            ...BaseConfig.module.rules,
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // sourceMap: true,
                            importLoaders: 1
                        }
                    },{
                        loader: "less-loader",
                        options: { javascriptEnabled: true } // less 3.0 需要设置
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "postcss-loader"
                    }
                ],
                include: /node_modules/
            }
        ]
    },
    plugins: [
        ...BaseConfig.plugins,
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin([
            "dist/*"
        ], { root: process.cwd() }),  // option默认路径
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: true
    }
}

module.exports = Object.assign({}, BaseConfig, ProdConfig);