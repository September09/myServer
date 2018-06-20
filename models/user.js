/**
 * Created by september on 2018/6/20.
 */
/**
 * 用户模型
 * userName: 用户名
 * password：密码
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', UserSchema);