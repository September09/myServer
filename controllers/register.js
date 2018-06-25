/**
 * Created by september on 2018/6/25.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const User = require('./../models/user')
const dtime = require('time-formater');
/**
 * login
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
    const user = await User.findOne({userName});

    if (!user) {
        const user = new User({
            userName,
            password,
            create_time: dtime().format('YYYY-MM-DD HH:mm'),
        })
        console.log('没有用户:' + user);
        user.save((err) => {
            if(err){
                ctx.response.body = {status: 1, msg: 'register err'}
                console.log(err);
            }
            ctx.response.body = {status: 0, msg: 'register success'}

        });
        // await User.create(newUser)
        // ctx.response.body = {status: 0, msg: 'register success'}
        console.log('注册成功——用户名:' + user);
    } else {
        ctx.response.body = result
    }
}

module.exports = {
    'POST /user/register': register,

};