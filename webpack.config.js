var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;

var entryPath = path.join(__dirname, 'ClientApp/boot-client.tsx' );
var path = require('path');
var webpack = require('webpack');

var isDevelopment = process.argv.indexOf('--development') !== -1;
var entry = isDevelopment ? [
  'webpack-hot-middleware/client?reload=true',
  'react-hot-loader/patch',
  entryPath
] : entryPath;

var plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
            __DEV__: isDevelopment
        })
];

isDevelopment && plugins.push(new webpack.HotModuleReplacementPlugin());

var clientBundleConfig = {
    cache: isDevelopment,
    debug: isDevelopment,
    plugins: plugins,
    entry: entry,
    resolve: { extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ] },
    output: {
        path: path.resolve("./wwwroot/Scripts/dist"),
        publicPath: '/Scripts/dist/',
        filename: 'bundle.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ],
        loaders: [
            {
                test: /\.scss$/,
                exclude: [/(node_modules)/],
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.ts(x?)$/,
                loaders: ['babel', 'ts-loader'],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, "ClientApp"),
            },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url', query: { limit: 25000 } }
        ]
    },
    target: 'web'
};

module.exports = clientBundleConfig;
