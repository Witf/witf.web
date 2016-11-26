var koa = require('koa');
var app = koa();

app.use(require('koa-static')("./wwwroot", null));
app.listen(3000);
