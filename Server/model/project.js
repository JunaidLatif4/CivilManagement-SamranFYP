const mongoose = require('mongoose');
const { ERRORS } = require("../../constants/index");

const projectSchema = new mongoose.Schema({
    title : {
        type : string,
        required : [true, "Project Title is Required"]
    },
    desription : {
        type : String,
        required : [true, " Project Description is Required"]
    },
    status : {
        type : String, 
        enum : {
            value : ["cancelled", "inprogress", "completed","active", "pending"],
            message : "Status must be inprogress, active, completed or pending",
            default : "inprogress",
        }
        // default : false
    },
    client : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user" 
    },
    consultant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        default : null,
    },
    contractor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        default : null
    },
},
{
    timestamps : true,
}) 

const projectModel = mongoose.model('projects',projectSchema)
module.exports = projectModel;