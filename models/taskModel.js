const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{type:String,trim: true,required:true},
    completed:{type:Boolean,required:true}
},{timestamps:true})

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;