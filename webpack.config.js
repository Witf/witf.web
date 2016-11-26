var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');
var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;

var clientBundleOutputDir = './wwwroot/scripts/dist';
var clientBundleConfig = {
    devServer: {
        historyApiFallBack: true,
        // progress: true,
        //hot: true,
        //inline: true,
        // https: true,
        port: 8080,
        contentBase: path.resolve(__dirname,'wwwroot'),
        proxy: {
            '/api/**': {
                changeOrigin: true,
                target: 'http://witf.apphb.com/api',
                secure: false
            }
        }
    },
    resolve: { extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ] },
    entry: { 'main-client': './ClientApp/boot-client.tsx' },
    module: {
        loaders: [
            { test: /\.tsx?$/, include: /ClientApp/, loader: 'babel-loader' },
            { test: /\.tsx?$/, include: /ClientApp/, loader: 'ts', query: { silent: true } },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'css')],
                loader: ExtractTextPlugin.extract("style","css!sass")
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'ClientApp')],
                exclude: [path.resolve(__dirname, 'css')],
                loaders: ["style","css","sass"]
            },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url', query: { limit: 25000 } }
        ]
    },
    output: {
        filename: '[name].js',
        publicPath: '/scripts/dist/', // Webpack dev middleware, if enabled, handles requests for this URL prefix
        path: path.join(__dirname, clientBundleOutputDir)
    },
    plugins: [
        new ExtractTextPlugin("app.css")
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ])
};

module.exports = clientBundleConfig;
