/**
 * Created by september on 2018/6/26.
 */

const passport = require('koa-passport');
const LocalStrategy = require('passport-local')

const User = require('./models/user');
const config = require('./config');

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
};