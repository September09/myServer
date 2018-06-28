/**
 * Created by september on 2018/6/15.
 */

const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
// const morgan = require('morgan'); // 命令行log显示
const passport = require('koa-passport');// 用户认证模块passport
// const Strategy = require('passport-http-bearer').Strategy;// token验证模块
const LocalStrategy = require('passport-local')
const session = require("koa-session2")
const config = require('./config');

// 配置控制台日志中间件
app.use(convert(koaLogger()));
app.use(passport.initialize());// 初始化passport模块
app.use(passport.session())
// app.use(morgan('dev'));// 命令行中显示程序运行日志,便于bug调试
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

//parse request body
app.use(koaBody);

app.use(controller());

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.listen(9091);
console.log('app started at port 9091...');
