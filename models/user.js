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
    },
    accessToken: String,
    id: Number,
    create_time: String
});

UserSchema.index({id: 1});

const User = mongoose.model('User', UserSchema);

module.exports = User;