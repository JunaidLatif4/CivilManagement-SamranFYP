const express = require("express");

const ProjectModel = require("../../model/project");

const catchAsync = require("../../utils/catchAsync");
const { CreateChannelByProject } = require("../../helper/chat")
const STATUS_CODE = require("../../constants/statusCode");
const { uploadFile } = require("../../utils/uploader");
const sendEmail = require('../../utils/emails/sendEmail');






exports.projectGet = catchAsync(async (req, res) => {
    try {
        let currentUser = req.user;
        const result = await ProjectModel.find({ [currentUser.role]: currentUser._id }).populate("client contractor engineer").populate({ path: "progress", select: "by from" });
        res.status(STATUS_CODE.OK).json({ result, message: "Data Fatched Success Fully" })
    } catch (err) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }
})
exports.GetProjectById = catchAsync(async (req, res) => {
    try {
        let currentUser = req.user;
        let { projectId } = req.params;
        const result = await ProjectModel.findById(projectId).populate("client contractor engineer").populate({ path: "progress", populate: "by from" });
        console.log("-------->", result);
        res.status(STATUS_CODE.OK).json({ result, message: "Data Fatched Success Fully" })
    } catch (err) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }
})

exports.projectPost = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    const data = req.body

    data.client = currentUser?._id

    try {

        const newData = new ProjectModel(data)
        await newData.save()
        await newData.populate("client contractor engineer")

        let name = newData?.title;
        let projectId = newData?._id;
        let users = [newData?.client?._id, newData?.contractor?._id, newData?.engineer?._id];
        let channelResult = await CreateChannelByProject({ name, users, projectId, currentUser }, next)

        sendEmail(`${newData?.contractor?.email}, ${newData?.engineer?.email}`, newData, next)

        res.status(STATUS_CODE.OK).json({ message: `Project Created SuccessFully`, result: newData, channelResult })
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }

})
exports.inviteResponse = catchAsync(async (req, res, next) => {
    let { response, projectId } = req.body;

    const currentUser = req?.user

    try {
        const projectData = await ProjectModel.findById(projectId)
        if (response == "reject") {
            projectData.status = "rejected"
            projectData.rejectedBy = currentUser?._id
        } else {
            projectData.acceptedBy = [...projectData.acceptedBy, currentUser?.role]
            if (projectData?.acceptedBy?.includes("contractor") && projectData?.acceptedBy?.includes("engineer")) {
                projectData.status = "inprogress"
            }
        }
        await projectData.save()
        res.status(STATUS_CODE.OK).json({ message: `Invite Updated`, result: projectData })

    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }


})

exports.addStepToProject = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    let { projectId } = req.params;
    let { name, description, type, from, deadLine } = req.body

    try {
        let stepDetails = {
            name,
            description,
            type,
            deadLine,
            by: currentUser._id,
            from
        }
        const projectData = await ProjectModel.findById(projectId)
        if (from == "client") {
            stepDetails.from = projectData?.client
        } else if (from == "contractor") {
            stepDetails.from = projectData?.contractor
        } else {
            stepDetails.from = projectData?.engineer
        }

        const result = await ProjectModel.findByIdAndUpdate(projectId, { $push: { progress: stepDetails } }, { new: true })

        res.status(STATUS_CODE.OK).json({ message: `Step Added to Project`, result })
    } catch (err) {
        console.log("----->", err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }

})

exports.ProjectStepResponse = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    let { projectId } = req.params;
    let { stepId, response, type } = req.body

    try {

        if (type == "document") {
            if (req.file) {
                let file = await uploadFile(req.file, null);
                response = file.url
            }
        }

        const result = await ProjectModel.findByIdAndUpdate(projectId, {
            $set: {
                [`progress.$[arr].response`]: response,
                [`progress.$[arr].submited`]: true
            }
        }, { "arrayFilters": [{ "arr._id": stepId }], new: true })

        res.status(STATUS_CODE.OK).json({ message: `Response Submited to Step`, result })
    } catch (err) {
        console.log("----->", err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }

})

