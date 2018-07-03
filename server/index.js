// const Koa = require('koa');
const Koa = require('koa');
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
 
const app = new Koa();

app.use(bodyParser());
app.use(logger());

app.on('error', function(err){
    console.error(`Error ${ err.message } at ${ err.stack.split('at ')[2] }`)
});

app.use(router.routes());

const server = app.listen(3000).on("error", err => {
    console.error(err);
});

module.exports = server;