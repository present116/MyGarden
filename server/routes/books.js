const express = require('express');
const router = express.Router();

const { User } = require("../models/User");
const { UserBook } = require("../models/Book")
const { auth } = require("../middleware/auth");


router.get('/list', (req, res)=>{

    UserBook.find({'email': req.email})
        .exec((err, userBook) => {
            if (err) return res.status(400).send(err)
            
            if(userBook.length === 0) 
                return res.status(200)
                .json({success: 'empty' , msg: "등록된 도서가 없습니다"})
            
            return res.status(200).send(userBook)
        })
})

module.exports = router;