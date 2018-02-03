const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    const plugins = [
        new CleanWebpackPlugin(['dist/*']),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ];

    if (isProd) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: !isProd,
                    drop_console: isProd,
                }
            })
        );
    }
    return plugins;
}

const config = {
    devtool: isProd ? 'hidden-source-map' : 'source-map',

    entry: {
        entryPoint: './src/templates/entrypoint.js',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
    },

    plugins: getPlugins(),
};

module.exports = config;

    
