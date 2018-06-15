/**
 * Created by september on 2018/6/15.
 */

const fs = require('fs');
const path = require('path');

/**
 * 验证码ocr
 * @param ctx
 * @returns {Promise<void>}
 */
async function login(ctx) {
    console.log(`${JSON.stringify(ctx.request.header)}`);
    console.log(ctx.request.body);

    ctx.response.body = {
        status: 0,
        msg: 'login success!',
    };
}


module.exports = {
    'OPTIONS /user/login': login,

};