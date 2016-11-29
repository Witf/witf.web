var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');
var open = require("open");
var fs = require("fs");
/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
var isDevelopment = process.argv.indexOf('--development') !== -1;
if(isDevelopment){
    app.use(require('webpack-dev-middleware')(compiler, {
        contentBase: path.join( __dirname, '../'),
        headers: { "Access-Control-Allow-Origin": "*" },
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/', express.static(path.join( __dirname, './wwwroot/')));

app.listen(isDevelopment ? port : 80, function(err) {
    if (err)
        console.log(err);
});