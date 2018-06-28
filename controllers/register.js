/**
 * Created by september on 2018/6/25.
 */

const fs = require('fs');
const User = require('./../models/user')
const dtime = require('time-formater');
/**
 * register
 * @param ctx
 * @returns {Promise<void>}
 */
async function register(ctx) {
    console.log(`${JSON.stringify(ctx.request.header)}`);
    console.log(ctx.request.body);
    let result = {
        status: 1,
        msg: 'user exit please login!',
    }

    // 从请求体中获得参数
    const { userName, password } = ctx.request.body;
    // 查询数据库中是否有当前用户
    const user = await User.findOne({userName});
    if (!user) {
        if (!userName || !password) {
            ctx.response.body = {
                status: 1,
                msg: "please input your username & password"
            }
        } else {
            const newUser = new User({
                userName: userName,
                password: password,
                create_time: dtime().format('YYYY-MM-DD HH:mm'),
            });
            const doc = await newUser.save();
            if (!doc.errors) {
                ctx.response.body = {status: 0, msg: 'register success'}
            } else {
                ctx.response.body = {status: 1, msg: 'register err'}
            }
        }
    } else {
        ctx.response.body = result;
    }

}

module.exports = {
    'POST /user/register': register,
};