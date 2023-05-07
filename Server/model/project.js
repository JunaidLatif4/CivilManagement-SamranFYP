const mongoose = require('mongoose');


const stepSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    reviewer: String,
    submited: {
        type: Boolean,
        default: false
    },
    deadLine: String,
})

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project Title is Required"]
    },
    description: {
        type: String,
        required: [true, " Project Description is Required"]
    },
    status: {
        type: String,
        enum: {
            values: ["cancelled", "inprogress", "completed", "active", "pending"],
            message: "Status must be inprogress, active, completed or pending",
        },
        default: "inprogress",
        // default : false
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    engineer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null,
    },
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    progress: [stepSchema]
},
    {
        timestamps: true,
    })

const projectModel = mongoose.model('projectModel', projectSchema)
module.exports = projectModel;