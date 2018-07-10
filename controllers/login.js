/**
 * Created by september on 2018/6/15.
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
/**
 * login
 * @param ctx
 * @returns {Promise<void>}
 */


async function login(ctx) {
    let result = {
        status: 1,
        msg: 'user not exit!',
    }
    // 从请求体中获得参数
    const { userName, password } = ctx.request.body;
    console.log('body',ctx.request);
    // 判断数据库中是否存在该用户
    const user = await User.findOne({userName});
    // 不存在用户 则提示用户不存在
    if (!user){
        ctx.response.body = result;
    } else {
        // 存在该用户 则校验密码是否正确
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({userName: user.userName}, config.secret, {expiresIn: 10080});
            user.token = token;
            await new Promise((resolve, reject) => {
                user.save((err) => {
                    if(err){
                        reject(err);
                    }
                    resolve();
                });
            });
            ctx.response.body = {status: 0, message: 'login success!', token: 'Bearer ' + token, userName: user.userName}
        } else {
            ctx.response.body = {status: 1, message: 'password error!'}
        }

    }

}

module.exports = {
    'POST /user/login': login,
};