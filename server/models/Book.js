const mongoose = require('mongoose')

const userBookSchema = mongoose.Schema({
    userEmail: {
        type: String,
        maxlength: 50
    },
    title: {
        type: String,
        maxlength: 50
    }, 
    image: {
        type: String,
        maxlength: 50
    },
    author: {
        type: String,
        minlength: 50
    },
    publisher: {
        type: String,
        minlength: 50
    },
    isbn: {
        type: String,
        minlength: 50
    },
    description: {
        type: String,
        minlength: 1000
    },
})


const UserBook = mongoose.model('UserBook', userBookSchema)
module.exports = { UserBook }