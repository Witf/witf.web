var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');
var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;

// Configuration in common to both client-side and server-side bundles
var sharedConfig = () => ({
    resolve: { extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ] },
    output: {
        filename: '[name].js',
        publicPath: '/scripts/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, include: /ClientApp/, loader: 'babel-loader' },
            { test: /\.tsx?$/, include: /ClientApp/, loader: 'ts', query: { silent: true } }
        ]
    }
});

// Configuration for client-side bundle suitable for running in browsers
var clientBundleOutputDir = './wwwroot/scripts/dist';
var clientBundleConfig = merge(sharedConfig(), {
    entry: { 'main-client': './ClientApp/boot-client.tsx' },
    module: {
        loaders: [
            //Everything inside the styles folder is packaged inte app.css and cant use hot reload
            //We typically develop in a standalone scss file first and then move it into the css folder.
            {
                test: /\.scss$/,
                //include: [path.resolve(__dirname, 'css')],
                include: [path.resolve(__dirname, 'css')],
                loader: ExtractTextPlugin.extract("style","css!sass")
            },
            //All sass NOT in the css folder we include in the bundle (and get it hot reloadable)
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
});

// Configuration for server-side (prerendering) bundle suitable for running in Node
var serverBundleConfig = merge(sharedConfig(), {
    entry: { 'main-server': './ClientApp/boot-server.tsx' },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, './ClientApp/dist')
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: "ignore"
            }
        ]
    },
    target: 'node',
    devtool: 'inline-source-map',
    externals: [nodeExternals({ whitelist: [allFilenamesExceptJavaScript] })] // Don't bundle .js files from node_modules
});

module.exports = [clientBundleConfig, serverBundleConfig];
