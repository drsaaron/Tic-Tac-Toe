var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/src/index.html",
    filename: "index.html",
    inject: 'body'
});

var copyPatterns = [
    { from: 'src/css', to: 'css' } /*,
    { from: 'src/favico.ico' },
    { from: 'src/images', to: 'images' },
    { from: 'data', to: 'data' }*/
];

module.exports = {
    //context: __dirname + "/src/src/js",
    entry: [ "./src/js/index.js" ],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
	extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
		loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use : ["style-loader", "css-loader" ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ patterns: copyPatterns }),
        HtmlWebpackPluginConfig
    ]
};
