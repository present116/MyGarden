const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7077;
const cors = require('cors');
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded 데이트럴 분석해서 가져올 수 있다.
app.use(bodyParser.json()) // application/json 데이터를 분석해서 가져올 수 있다.
app.use(cookieParser())
app.use(cors());


app.post('/api/users/auth',auth, (req, res)=>{
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
app.post('/api/users/register', async (req, res) => {

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
app.post('/api/users/login', (req, res) => {
 
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



app.listen(port, () => console.log(`app listening on port ${port}!`))