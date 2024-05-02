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


app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));

app.listen(port, () => console.log(`app listening on port ${port}!`))