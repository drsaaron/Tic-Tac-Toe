var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/src/index.html",
    filename: 'index.html',
    inject: 'body'
});

var copyPatterns = [
    {from: 'src/index.html'},
    {from: 'src/favicon.ico'},
    {from: 'src/css', to: 'css'},
    {from: 'src/images', to: 'images'},
    {from: 'data', to: 'data'}
];

module.exports = {

    entry: ['./src/js/index.js'],

    output: {

        path: __dirname + '/dist',
        filename: "bundle.js"
    },

    devServer: {
        outputPath: __dirname + '/dist'
    },

    module: {

        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            /*{
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(['css', 'sass'])
            }*/
        ]
    },

    plugins: [new CleanWebpackPlugin(['dist'], {}), new CopyWebpackPlugin(copyPatterns, {}), new ExtractTextPlugin('css/style.css', {
            allChunks: true
        }), HtmlWebpackPluginConfig],
    
    resolve: {
        extensions: [ '', '.js', '.jsx' ]
    }

};
