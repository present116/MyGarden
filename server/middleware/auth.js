const { User } = require('../models/User')

let auth = (req, res, next) => { // 인증 처리

    let token = req.cookies.x_auth // 클라이언트에서 쿠키에 토큰을 가져온다

    // 토큰 복화화 한 후 유저를 찾는다
    User.findByToken(token, function(err, user) {
        if(err) throw err;
        if(!user) {
            return res.json({isAuth: false, error: true})
        }

        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }

