/**
 * Created by september on 2018/6/29.
 */

const fs = require('fs');
const User = require('./../models/user')
const dtime = require('time-formater');
const passport = require('passport');
require('../passport')(passport);
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

    // 从请求体中获得参数
    // const { userName, password } = ctx.request.body;
    // 查询数据库中是否有当前用户
    // const user = await User.find();
    passport.authenticate('bearer', {session: false})
    if (!user) {
        ctx.response.body = result
    } else {
        ctx.response.body = {
            status: 0,
            data: user,
            msg: 'have users',
        };
    }

}

module.exports = {
    'POST /user/allUsers': getAllUsers,
};
