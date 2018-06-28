/**
 * Created by september on 2018/6/26.
 */

const User = require('./../models/user')
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');

require('../passport')(passport);

/**
 * access-token
 * @param ctx
 * @returns {Promise<void>}
 */
async function token(ctx) {
    console.log(`${JSON.stringify(ctx.request.header)}`);
    console.log(ctx.request.body);

    let result = {
        status: 1,
        msg: 'invalid_token',
    }

    // 从请求体中获得参数
    const { userName, password } = ctx.request.body;
    const user = await User.findOne({userName});

    if (!user) {
        ctx.response.body = result
    } else {
        const toCompare = await user.comparePassword(password, compareResult())
        const compareResult = (err, isMatch) => {
            if (isMatch && !err) {
                const token = jwt.sign({userName: user.userName}, config.secret, {expiresIn: 10080});
                user.token = token;
                user.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    ctx.response.body = {
                        status: 0,
                        token: 'token' + token,
                        userName: user.userName
                    }
                })
            } else {
                ctx.response.body = {
                    status: 0,
                    msg: 'password is err',
                }
            }
        }
    }

}

module.exports = {
    'POST /user/token': token,
};