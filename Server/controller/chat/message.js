const fs = require('fs');
const MessageModel = require('../../model/chat/message');
const User = require('../../model/user');
const Channel = require('../../model/chat/channel');

const path = require('path');
// const { uploadToS3Bucket } = require('../utils/s3Bucket.util');
// const Notification = require('../models/notification.model');
// var FCM = require('fcm-node');

module.exports = {
  create: async (req, res, next) => {
    try {
      let { receiver_id, channel_id, message, type } = req.body;
      let currentUser = req.user;

      // if (payload?.type === 'attachment') {
      // const file = req.files?.attachment[0];

      // filePath = path.join(__dirname, '../uploads/', file.filename);
      // let blob = fs.readFileSync(filePath);
      // const uploadFile = await uploadToS3Bucket(blob, file.filename);
      // fileUrl = uploadFile.Location;
      // if (fileUrl) {
      //   fs.unlinkSync(filePath);
      // }

      // payload.attachment = fileUrl;
      // payload.fileType = file.mimetype;
      // payload.fileName = file.originalname;
      // }

      // payload.sender_id = _id.toString();
      // payload.senderName = userName ?? fullName;
      // payload.reply_of = payload?.reply_of ?? null;
      var d = new Date();
      var dateTime = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2),
      ].join('-');
      // payload.time = date;

      let result = new MessageModel({
        sender_id: currentUser?._id,
        senderData: currentUser?._id,
        receiver_id,
        channel_id,
        message,
        type,
        time: dateTime
      });
      await result.save();
      await result.populate("senderData");
      res.json({ status: 201, message: 'Message Created', result });
    } catch (error) {
      console.log("---->" , error);
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { body: payload } = req;
      let { page = 1, limit = 10 } = req.query;

      const messages = await MessageModel.find(payload)
        .populate({
          path: 'reply_of',
          select: 'message',
        }).populate("senderData")
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await MessageModel.countDocuments(payload);

      // messages.reverse() return messages in reverse order
      res.json({
        satus: 200,
        result: messages.reverse(),
        pagination: {
          page,
          limit,
          totalRecords: count,
          totalPages:
            Math.ceil(count / limit) <= 0 ? 1 : Math.ceil(count / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },
  // sendNotification: async (payload) => {
  //   try {
  //     const messageBody = payload.message;

  //     var serverKey = process.env.FIREBASE_SERVER_KEY;
  //     var fcm = new FCM(serverKey);

  //     const count = await MessageModel.countDocuments({
  //       receiver_id: messageBody?.receiver_id,
  //       status: 'unread',
  //     });

  //     // Fetch notification documents from DB
  //     let user_ids = payload?.channel?.users;
  //     user_ids.push(payload?.channel?.admin);
  //     // remove sender from notification users
  //     const index = user_ids.indexOf(messageBody.sender_id);
  //     if (index > -1) {
  //       // 2nd parameter means remove one item only
  //       user_ids.splice(index, 1);
  //     }

  //     var notifications;
  //     if (payload?.channel?.type === 'group') {
  //       notifications = await Notification.find({
  //         user_id: {
  //           $in: user_ids,
  //         },
  //       });
  //     } else {
  //       notifications = await Notification.find({
  //         user_id: messageBody.receiver_id,
  //       });
  //     }

  //     // if no FCM, return
  //     if (notifications?.length === 0) {
  //       return false;
  //     }

  //     // Prepare array of FCM tokens
  //     var registration_ids = [];
  //     notifications.map(({ fcmToken }) => registration_ids.push(fcmToken));

  //     // prepare title
  //     let title = messageBody?.senderName;
  //     // if (payload?.channel?.type === 'group') {
  //     //   title = messageBody?.senderName;
  //     // } else {
  //     //   if (
  //     //     messageBody.sender_id ===
  //     //     payload.channel?.professional_id?._id?.toString()
  //     //   ) {
  //     //     title = payload.channel?.professional_id?.fullName;
  //     //   } else if (
  //     //     messageBody.sender_id === payload.channel?.client_id?._id?.toString()
  //     //   ) {
  //     //     title = payload.channel?.client_id?.fullName;
  //     //   }
  //     // }

  //     // Prepare body
  //     let body;
  //     if (messageBody.type === 'agreement') {
  //       body = 'New Payment request received';
  //     } else if (messageBody.type === 'review') {
  //       body = 'New Review received';
  //     } else if (messageBody.type === 'attachment') {
  //       body = 'New Attachment received';
  //     } else {
  //       body = messageBody?.message;
  //     }

  //     // Prepare Notification data
  //     var message = {
  //       registration_ids: registration_ids,
  //       notification: {
  //         title: title,
  //         body: body,
  //         badge: count,
  //         priority: 'high',
  //         sound: 'default',
  //       },
  //       data: {
  //         type: '2',
  //         channel: payload.channel,
  //       },
  //     };

  //     // Fire the notification to the array of FCM tokens
  //     fcm.send(message, async function (err, response) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(response);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // callNotification: async (req, res, next) => {
  //   try {
  //     const { body: payload } = req;

  //     // var serverKey = process.env.FIREBASE_SERVER_KEY;
  //     var serverKey = process.env.FIREBASE_SERVER_KEY;
  //     var fcm = new FCM(serverKey);

  //     // Fetch notification documents from DB
  //     var notifications = await Notification.find({
  //       user_id: payload.user_id,
  //     });

  //     // Prepare array of FCM tokens
  //     var registration_ids = [];
  //     notifications.map(({ fcmToken }) => registration_ids.push(fcmToken));

  //     let text = 'Incoming Voice Call';
  //     // if (req.headers['accept-language'] == 'es') {
  //     //   text = await translate(text, 'es');
  //     // }

  //     // Prepare Notification data
  //     var message = {
  //       registration_ids: registration_ids,
  //       notification: {
  //         title: `${payload?.caller_name}`,
  //         body: text,
  //         messageBody: text,
  //         message: text,
  //       },
  //       data: {
  //         type: '3',
  //         channel_id: payload?.channel_id,
  //         caller_name: payload?.caller_name,
  //         user_id: payload?.user_id,
  //         channel: payload?.channel,
  //         random_id: Math.floor(1000 + Math.random() * 9000),
  //       },
  //     };
  //     console.log({ message });

  //     // Fire the notification to the array of FCM tokens
  //     fcm.send(message, async function (err, response) {
  //       if (err) {
  //         console.log(err);
  //         res.send(err);
  //       } else {
  //         console.log(response);
  //         res.send(response);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // next(error);
  //   }
  // },
  // messageNotification: async (req, res, next) => {
  //   try {
  //     const { body: payload } = req;
  //     const messageBody = payload?.message;

  //     const channel = await Channel.findById(payload?.message?.channel_id)
  //       .populate({
  //         path: 'client_id',
  //         populate: {
  //           path: 'profession',
  //         },
  //       })
  //       .populate({
  //         path: 'professional_id',
  //         populate: {
  //           path: 'profession',
  //         },
  //       });

  //     var serverKey = process.env.FIREBASE_SERVER_KEY;
  //     var fcm = new FCM(serverKey);

  //     // Fetch notification documents from DB
  //     var notifications = await Notification.find({
  //       user_id: messageBody.receiver_id,
  //     });

  //     // if no FCM, return
  //     if (notifications?.length === 0) {
  //       return false;
  //     }

  //     // Prepare array of FCM tokens
  //     var registration_ids = [];
  //     notifications.map(({ fcmToken }) => registration_ids.push(fcmToken));

  //     // prepare title
  //     let title;
  //     if (messageBody.sender_id === channel?.professional_id?._id?.toString()) {
  //       title = channel?.professional_id?.fullName;
  //     } else if (
  //       messageBody.sender_id === channel?.client_id?._id?.toString()
  //     ) {
  //       title = channel?.client_id?.fullName;
  //     }

  //     // Prepare body
  //     let body;
  //     if (messageBody.type === 'agreement') {
  //       body = 'New Payment Request received';
  //     } else if (messageBody.type === 'review') {
  //       body = 'New Review received';
  //     } else if (messageBody.type === 'attachment') {
  //       body = 'New Attachment received';
  //     } else {
  //       body = messageBody?.message;
  //     }

  //     // Prepare Notification data
  //     var message = {
  //       registration_ids: registration_ids,
  //       notification: {
  //         title: title,
  //         body: body,
  //         // messageBody: body,
  //         // message: body,
  //       },
  //       data: {
  //         type: '2',
  //         channel: channel,
  //       },
  //     };
  //     console.log(message);

  //     // Fire the notification to the array of FCM tokens
  //     fcm.send(message, async function (err, response) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(response);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // updateReaction: async (req, res, next) => {
  //   try {
  //     const { body: payload, user } = req;
  //     const message = await MessageModel.findById(payload?.message_id);
  //     let messageReactions = MessageModel.reactions;
  //     let result;
  //     // if reacted with same emoji, remove it
  //     let isSameReaction = messageReactions.find(
  //       (reaction) =>
  //         reaction.user_id.toString() === user?._id.toString() &&
  //         reaction.reaction === payload.reaction,
  //     );
  //     if (isSameReaction) {
  //       result = await MessageModel.findByIdAndUpdate(
  //         payload?.message_id,
  //         {
  //           $pull: { reactions: { user_id: user?._id } },
  //         },
  //         { new: true },
  //       );
  //     }

  //     // if reacted with different emoji, update it
  //     let isDifferentReaction = messageReactions.find(
  //       (reaction) =>
  //         reaction.user_id.toString() === user._id.toString() &&
  //         reaction.reaction !== payload.reaction,
  //     );
  //     if (isDifferentReaction) {
  //       result = await MessageModel.findOneAndUpdate(
  //         { _id: payload?.message_id, 'reactions.user_id': user?._id },
  //         {
  //           $set: {
  //             'reactions.$.reaction': payload.reaction,
  //           },
  //         },
  //         { new: true },
  //       );
  //     }

  //     // if new reaction
  //     if (isSameReaction === undefined && isDifferentReaction === undefined) {
  //       result = await MessageModel.findOneAndUpdate(
  //         { _id: payload?.message_id },
  //         {
  //           $push: {
  //             reactions: { reaction: payload.reaction, user_id: user?._id },
  //           },
  //         },
  //         { new: true },
  //       );
  //     }

  //     res.json({ status: 200, message: 'Reaction Updated', data: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // updateSeenBy: async (req, res, next) => {
  //   try {
  //     const { body: payload, user } = req;
  //     await MessageModel.updateMany(
  //       {
  //         _id: {
  //           $in: payload?.message_ids,
  //         },
  //       },
  //       {
  //         $addToSet: {
  //           seen_by: user?._id,
  //         },
  //       },
  //       { new: true },
  //     );
  //     const result = await MessageModel.find({
  //       _id: {
  //         $in: payload?.message_ids,
  //       },
  //     });
  //     res.json({ status: 200, message: 'Seen By Updated', data: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
