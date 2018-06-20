/**
 * Created by september on 2018/6/15.
 */

const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('./config');
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const app = new Koa();

// 配置控制台日志中间件
app.use(convert(koaLogger()));

const koaBody = require('koa-body')({
    multipart: true,    //支持 multipart/form-data
    formidable: {   //https://github.com/felixge/node-formidable
        // uploadDir: './tmp', //使用默认的os.tmpdir()目录,系统定期自动清理
        keepExtensions: true
    }
});

const controller = require('./controller');

app.use(async (ctx, next) => {
    ctx.header = {
        "Access-Control-Allow-Origin": ctx.request.headers.origin || '*',
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        "Access-Control-Allow-Credentials": true, //可以带cookies
        "X-Powered-By": '3.2.1',
        'Content-Type': 'application/json;charset=utf-8',
    }
    await next();
})


app.use(async (ctx, next) => {
    await next();
    // console.log(`${getCurrentTime()} ${ctx.request.ip} ${ctx.request.method} ${ctx.request.url}`);
});

//parse request body
app.use(koaBody);

app.use(controller());

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.listen(9091);
console.log('app started at port 9091...');
