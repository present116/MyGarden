const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

/**
 * 회원 인증
 */
router.post('/auth',auth, (req, res)=>{
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false: true, // Role ==0 -> 일반유저(role : false), 이외는 관리자
      isAuth : true,
      email : req.user.email,
      name: req.user.name,
      lastname : req.user.lastname,
      role : req.user.role,
      image: req.user.image
    })
  })

/**
 * 회원가입
 */
router.post('/register', async (req, res) => {

    await User.findOne({email: req.body.email}, (err, user) => {
      
      if(!user){
        const user = new User(req.body);
        user.save()
        .then(()=>{
          res.status(200).json({
            success: true
          })
        })
        .catch((err) => {
          res.json({success: false, err})
        })
      }else{
        return res.status(200)
        .json({success: "dupl", msg : "사용할 수 없는 이메일 입니다. 다른 이메일을 입력해 주세요."})
      }
    }) 
  })
  
  
  /**
   * 로그인
   */
  router.post('/login', (req, res) => {
   
    User.findOne({email: req.body.email}, (err, user) => {
      if(!user) {
        return res.json({
          loginSuccess : 'empty',
          msg: "옳바르지 않은 이메일 입니다."
        })
      }
      
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) {
          return res.json({loginSuccess: 'pwErr', msg: "비밀번호가 옳바르지 않습니다."})
        }
        user.generateToken((err, userToken) => {
          if(err) return res.status(400). send(err);
  
          res.cookie("x_auth", userToken.user_token)
            .status(200)
            .json({loginSuccess: true, userId: userToken.user_id})
        })
      })
    })
  })
  
  module.exports = router;