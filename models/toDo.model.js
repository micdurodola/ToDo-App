const mongoose = require('mongoose');
const Schema = mongoose.Schema;


toDoSchema = new Schema({    
    todo_name:{type:String,required:true,minlength:3},
    status:{type:Boolean, required:true},
    start_time:{type:Date, required:true,default:Date.now},
    end_time:{type:Date, required:true},
    description:{type:String, required:true,minlength:3},
    priority:{type:String,enum:['High','Low','Medium'], required:true},},
    {timestamps:true});
const ToDo = mongoose.model('ToDo',toDoSchema);

module.exports=ToDo;