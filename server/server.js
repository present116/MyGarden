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
mongoose.connect(config.mongoURI, {})
  .then((() => console.log('MongoDB connected...')))
  .catch(err => console.log('MongoDB not connected!'))

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



app.post('/api/users/register', async (req, res) => {
  const user = new User(req.body);

  await user.save()
    .then(()=>{
      res.status(200).json({
        success: true
      })
    })
    .catch((err) => {
      res.json({success: false, err})
    })
})


app.listen(port, () => console.log(`app listening on port ${port}!`))