var path = require('path');
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackconfig = require('./webpack.config.js');
    
//webpackconfig.plugins = [new webpack.HotModuleReplacementPlugin()];
webpackcompiler = webpack(webpackconfig);
//enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app) {
    app.use(webpackDevMiddleware(webpackcompiler, {
        publicPath: webpackconfig.output.publicPath,
        inline: true,
        contentBase: path.join( __dirname, '../'),
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: {
            colors: true,
            chunks: false,
            'errors-only': true
        }
    }));
    
    app.use(webpackHotMiddleware(webpackcompiler, {
        log: console.log
    }));
 
    return app;
}
 
module.exports = useWebpackMiddleware;