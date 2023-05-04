const express = require("express");

const MessageModel = require('../../model/chat/message');
const ChannelModel = require('../../model/chat/channel');
const UserModel = require('../../model/user');

const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { sendCustomSms } = require('../libs/otp_service.lib');





module.exports = {
  CreateChannel: async (req, res, next) => {
    try {
      let { type, users, name, description, projectId } = req.body;
      let currentUser = req.user;
      let response;

      let findChannel = await ChannelModel.find({ users: users, type: 'group' });

      if (findChannel.length > 0) {
        response = {
          status: 400,
          message: 'Channel already exist',
          result: findChannel[0],
        };
      } else {
        let chatImg;
        if (req?.file) {
          const directoryPath = path.join(__dirname, '../uploads');
          const picImg = path.join(
            __dirname,
            '../uploads/',
            req?.file.filename,
          );
          chatImg = picImg;
        }

        let channel = await ChannelModel.create({
          users: users,
          type: type,
          admin: currentUser?._id,
          chatImage: chatImg,
          chanelName: name,
          description: description,
          projectId
        });

        response = {
          message: 'Channel created',
          result: channel,
        };
      }
      res.json(response);
    } catch (error) {
      next(error);
    }
  },

  GetChennelByProject: async (req, res, next) => {
    try {
      let { projectId } = req.body;
      const currentUser = req;

      const channels = await ChannelModel.find({ projectId }).populate({ path: 'users' });

      res.json({ satus: 200, result: channels });
    } catch (error) {
      next(error);
    }
  },

  getChannelIds: async (req, res, next) => {
    try {
      const { user } = req;
      const query =
        user.role === 'agent'
          ? { client_id: user._id }
          : { professional_id: user._id };

      var channel_ids = [];
      const channels = await ChannelModel.find({
        $or: [{ users: { $in: user?._id } }, { query }, { admin: user?._id }],
      }).select('_id');
      channels.map(({ _id }) => channel_ids.push(_id));

      res.json({ satus: 200, data: channel_ids });
    } catch (error) {
      next(error);
    }
  },
  readMessage: async (req, res, next) => {
    try {
      const { body: payload } = req;

      await MessageModel.updateMany(
        { channel_id: payload?.channel_id, status: 'unread' },
        { status: 'read' },
      );

      res.json({ satus: 200, message: 'success' });
    } catch (error) {
      next(error);
    }
  },
  getChannelsInEmit: async (user_id, role) => {
    const query =
      role === 'agent' ? { client_id: user_id } : { professional_id: user_id };
    const channels = await ChannelModel.find({
      $or: [{ users: { $in: user_id } }, { query }],
    });
    let result = false;
    for (let channel of channels) {
      const count = await MessageModel.countDocuments({
        channel_id: channel?._id,
        receiver_id: user_id,
        status: 'unread',
      });
      if (count > 0) {
        result = true;
      }
    }
    return result;
  },
  getUsers: async (req, res, next) => {
    try {
      let { channelId } = req.body;
      const channel = await ChannelModel.findById(channelId);

      if (!channel) {
        next(createError(404, 'Channel not found'));
      }
      const usersIds = channel.users;
      const channelUsers = await UserModel.find(
        { _id: { $in: usersIds } },
        'fullName userName _id profileImage',
      );
      res.json({ satus: 200, message: 'success', data: channelUsers });
    } catch (error) {
      next(error);
    }
  },
};

const deleteFromUploadDirectory = (deleteArray, directoryPath) => {
  for (const file of deleteArray) {
    if (file) {
      const isExistFile = fs.unlinkSync(`${directoryPath}/${file}`);

      if (isExistFile) {
        console.log('delete!');
      }
    }
  }
};
