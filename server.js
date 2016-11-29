var express = require('express');
var path = require('path');
var fs = require("fs");
/* eslint-disable no-console */

const port = process.env.port || 3000;
const app = express();

var isDevelopment = process.argv.indexOf('--development') !== -1;
if(isDevelopment){
    var webpack = require('webpack');
    var config = require('./webpack.config');
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        contentBase: path.join( __dirname, '../'),
        headers: { "Access-Control-Allow-Origin": "*" },
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/', express.static(path.join( __dirname, './wwwroot/')));

app.listen(port, function(err) {
    if (err)
        console.log(err);
});