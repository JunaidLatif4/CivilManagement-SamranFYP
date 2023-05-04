const express = require("express");

const ProjectModel = require("../../model/project");

const catchAsync = require("../../utils/catchAsync");
const { CreateChannelByProject } = require("../../helper/chat")
const STATUS_CODE = require("../../constants/statusCode");






exports.projectGet = catchAsync(async (req, res) => {
    try {
        let currentUser = req.user;
        const result = await ProjectModel.find({ [currentUser.role]: currentUser._id }).populate("client contractor engineer");
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

        let name = newData?.title;
        let projectId = newData?._id;
        let users = [newData?.client, newData?.contractor, newData?.engineer];
        let channelResult = await CreateChannelByProject({ name, users, projectId, currentUser }, next)

        res.status(STATUS_CODE.OK).json({ message: `Project Created SuccessFully`, result: newData, channelResult })
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }

})

