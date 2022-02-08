const mongoose = require('mongoose');
const  userSchema = require('./User');
const newUser = new userSchema();

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User',required: true}
});

module.exports = mongoose.model('Article', articleSchema);