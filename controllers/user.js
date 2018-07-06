/**
 * Created by september on 2018/6/29.
 */

const fs = require('fs');
const User = require('./../models/user')
const dtime = require('time-formater');
const jwt = require('koa-jwt')
const config = require('../config/config');

/**
 * get all users
 * @param ctx
 * @returns {Promise<void>}
 */
async function getAllUsers(ctx) {
    let result = {
        status: 1,
        msg: 'no users!',
    }

    payload = getJWTPayload(ctx.headers.authorization);

    // 从请求体中获得参数
    // 查询数据库中是否有当前用户
    const user = await User.find();
    // console.log(user);
    console.log('111111',ctx.request.headers);
    console.log('2222222',ctx.request.url);
    // payload = jwt.verify(ctx.headers.authorization)
    //
    if (!user) {
        ctx.response.body = result

    } else {
        ctx.response.body = {
            status: 0,
            data: user,
            msg: 'have users',
        };
        console.log('111111',ctx.request.headers);
    }

}

/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.verify(token.split(' ')[1], config.secret);
}

module.exports = {
    'POST /user/allUsers': getAllUsers,
};
