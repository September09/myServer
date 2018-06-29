/**
 * Created by september on 2018/6/26.
 */

const passport = require('koa-passport');
const LocalStrategy = require('passport-local')

const User = require('./models/user');
const config = require('./config/config');

/**
 * token 验证
 * @param token 用户token
 * @param done 验证完成后的回调函数，由passport调用
 */

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(token, done) {
            User.findOne({
                token: token
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    // serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
    passport.serializeUser(function (user, done) {
        done(null, user)
    })

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
    passport.deserializeUser(function (user, done) {
        return done(null, user)
    })
};