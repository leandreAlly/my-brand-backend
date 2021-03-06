const mongoose = require('mongoose');//Import mongo db

const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    token: { type: String }
});


module.exports = mongoose.model('User', userSchema);