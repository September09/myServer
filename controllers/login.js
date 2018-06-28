/**
 * Created by september on 2018/6/15.
 */

const fs = require('fs');
const path = require('path');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
/**
 * login
 * @param ctx
 * @returns {Promise<void>}
 */
async function login(ctx) {
    console.log(`${JSON.stringify(ctx.request.header)}`);
    console.log(ctx.request.body);

    let result = {
        status: 1,
        msg: 'user not exit!',
    }

    // 从请求体中获得参数
    const { userName, password } = ctx.request.body;
    const user = await User.findOne({userName});
    if (!user) {
        ctx.response.body = result;
    } else {
        //判断密码是否正确
         return user.comparePassword(password, (err, isMatch) => {
             if (isMatch && !err) {
                const token = jwt.sign({userName: user.userName}, config.secret, {expiresIn: 10080});
                user.token = token;
                 ctx.response.body = {status: 0, message: 'login success!', token: 'token ' + token, userName: user.userName}
                // user.save((err) => {
                //     if (err) return ctx.response.body = err;
                //     ctx.response.body = {status: 0, message: 'login success!', token: 'token ' + token, userName: user.userName}
                // })
            } else {
                 console.log(77777777);
                ctx.response.body = {status: 1, message: 'password error!'}
            }
        })
        // if (password === user.password) {
        //     ctx.response.body = {status: 0, message: 'login success!'}
        // } else {
        //     ctx.response.body = {status: 1, message: 'login error!'}
        // }
    }
}


module.exports = {
    'POST /user/login': login,

};