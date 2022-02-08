const mongoose = require("mongoose");
const articleSchema = require("./article");
const userSchema = require("./User");


const commentSchema = new mongoose.Schema({
    text:{type: String, required:[true,'Please give a comment']},
    articleId:{type: mongoose.Schema.Types.ObjectId, ref:'article', required: true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
})
module.exports = mongoose.model('Comment', commentSchema);
