const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    username:{type:String,require:true},
    password:{type:String,require:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;