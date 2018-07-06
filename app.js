/**
 * Created by september on 2018/6/15.
 */

const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const config = require('./config/config');
const jwt = require('koa-jwt')
// const errorHandle = require('./middleware/errorHandle');

const koaBody = require('koa-body')({
    multipart: true,    //支持 multipart/form-data
    formidable: {   //https://github.com/felixge/node-formidable
        // uploadDir: './tmp', //使用默认的os.tmpdir()目录,系统定期自动清理
        keepExtensions: true
    }
});

app.use(jwt({secret: config.secret}).unless({
    path: [/\/register/, /\/login/],
}))

app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                ok: false,
                msg: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err;
        }
    });
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

//parse request body
app.use(koaBody);


app.use(controller());
// app.use(errorHandle);


// 配置控制台日志中间件
app.use(convert(koaLogger()));
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.listen(9091);
console.log('app started at port 9091...');
