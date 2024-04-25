const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    }, 
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image : String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) next(err);
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function(err, isMatch) { // 들어온 패스워드와 db의 패스워드를 비교한다
        if(err) return cb(err)
        cb(null, isMatch)
    })
}


userSchema.methods.generateToken = function(cb) {
    var user = this
    var token = jwt.sign(user._id.toJSON(), 'secretToken') // 토큰을 id값으로 만든다
    user.token = token
    user.save()
        .then(()=>{
            cb(null, user)
        })
        .catch((err) => {
            return cb(err)
        })
} 


userSchema.statics.findByToken = function(token, cb) {
    // 복화화 하는 로직
    var user = this;
    jwt.verify(token, 'secretToken', function(err, decoded) { 

        user.findOne({"_id" : decoded, "token" : token})
        .then(user => {
            cb(null, user)
        })
        .catch((err)=>{
            return cb(err)
        })
    })

}



const User = mongoose.model('User', userSchema)
module.exports = { User }