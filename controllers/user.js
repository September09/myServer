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

    // 查询数据库中所有用户
    const user = await User.find();
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

module.exports = {
    'POST /user/allUsers': getAllUsers,
};
