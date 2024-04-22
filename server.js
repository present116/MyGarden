const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7077;
const cors = require('cors');
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {})
  .then((() => console.log('MongoDB connected...')))
  .catch(err => console.log('MongoDB not connected!'))

app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded 데이트럴 분석해서 가져올 수 있다.
app.use(bodyParser.json()) // application/json 데이터를 분석해서 가져올 수 있다.
app.use(cookieParser())
app.use(cors());
