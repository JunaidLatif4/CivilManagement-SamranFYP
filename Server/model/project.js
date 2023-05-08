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
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
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
            values: ["cancelled", "rejected", "inprogress", "completed", "active", "pending"],
            message: "Status must be inprogress, active, completed or pending",
        },
        default: "pending",
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
    acceptedBy: {
        type: Array,
        default: []
    },
    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    progress: [stepSchema]
},
    {
        timestamps: true,
    })

const projectModel = mongoose.model('projectModel', projectSchema)
module.exports = projectModel;