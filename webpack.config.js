const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "MasterSlaveScroll.js"
    },
    devServer: {
        inline: true,
        port: 3333
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};