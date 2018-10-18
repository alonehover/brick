const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BaseConfig = require("./base.config");

const ProdConfig = {
    mode: "production",
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1
                        }
                    }, {
                        loader: "postcss-loader"
                    }, {
                        loader: "less-loader",
                        options: { javascriptEnabled: true } // less 3.0 需要设置
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[hash:6].css",
            chunkFilename: "css/chunk.[hash:6].css"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    test: "vendor",
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }
};

module.exports = Object.assign({}, BaseConfig, ProdConfig);
