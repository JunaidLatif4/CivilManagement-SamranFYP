const express = require("express");

const ChannelModel = require("../model/chat/channel");

const path = require("path");





const CreateChannelByProject = async ({ name, users, projectId, currentUser }, next) => {
    try {
        let type = "group";
        let response;

        let findChannel = await ChannelModel.find({ projectId });

        if (findChannel.length > 0) {
            response = {
                message: 'Channel already exist',
                result: findChannel[0],
            };
        } else {
            let channel = await ChannelModel.create({
                users: users,
                type: type,
                admin: currentUser?._id,
                chanelName: name,
                projectId
            });

            response = {
                message: 'Channel created',
                result: channel,
            };
        }
        return response;
    } catch (error) {
        console.log("*********>", error);
        next(error);
    }
}

module.exports = { CreateChannelByProject }