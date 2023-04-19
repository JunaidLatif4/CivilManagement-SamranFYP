const mongoose = require('mongoose');
const { ERRORS } = require("../../constants/index");

const projectSchema = new mongoose.Schema({
    title : {
        type : string,
        required : [true, "Project Title is Required"]
    },
    decs : {
        type : String,
        required : [true, " Project Description is Required"]
    },
    status : {
        type : Boolean, 
        default : false
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
    toJSON : {virtuals:true},
    toObject:{virtuals:true},
}) 

const projectModel = mongoose.model('projects',projectSchema)
module.exports = projectModel;