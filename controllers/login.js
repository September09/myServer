/**
 * Created by september on 2018/6/15.
 */

const fs = require('fs');
const path = require('path');
const User = require('./../models/user');
/**
 * 验证码ocr
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
    await User.findOne({
        userName
    }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            ctx.response.body = result;
        } else {
            //判断密码是否正确
            if (password === user.password) {
                ctx.response.body = {status: 0, message: 'login success!'}
            } else {
                ctx.response.body = {status: 1, message: 'login error!'}
            }
        }
    })
}


module.exports = {
    'POST /user/login': login,

};