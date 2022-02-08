const mongoose = require("mongoose");
const articleSchema = require("./article");
const userSchema = require("./User");


const likeSchema = new mongoose.Schema({
    articleId:{type: mongoose.Schema.Types.ObjectId, ref:'article', required: true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
})

module.exports = mongoose.model('Like', likeSchema);
