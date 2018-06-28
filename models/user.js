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

const bcrypt = require('bcryptjs');

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
    create_time: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});


// 针对用户密码进行加密处理
console.log('this',this);
UserSchema.pre('save', function(next) {
    var user = this;
    console.log('next',next);
    // 如果密码没有被修改 或者是  新用户的话 进行密码加盐操作
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
})

// 检验用户输入密码是否正确
UserSchema.methods.comparePassword = (pwd, cb) => {
    bcrypt.compare(pwd, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}


const User = mongoose.model('User', UserSchema);

module.exports = User;