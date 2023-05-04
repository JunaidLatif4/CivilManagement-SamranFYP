const { sendNotificationOnPhone } = require('../libs/otp_service.lib');
const {
  created,
  notFound,
  success,
  notificationSent,
} = require('../utils/messages.util');
const User = require('../models/user.model');
const Channel = require('../models/channel.model');
const async = require('async');
const createError = require('http-errors');

const Notification = require('../models/notification.model');
var FCM = require('fcm-node');
const { sendNotificationOnEmail } = require('../libs/email_service.lib');

module.exports = {
  sendNotification: async (req, res, next) => {
    try {
      const { body: payload } = req;

      const messageBody = payload.messageBody;
      const conversation_key = payload.conversation_key;
      const is_agent = payload.is_agent;
      const sender = payload.sender;
      const receiver = payload.receiver;

      const user = await User.findOne({ email: receiver.email });
      if (!user) {
        throw createError(400, 'User not found');
      }

      var serverKey =
        'AAAAOqqy1BY:APA91bHofeeEkpRlNI_TDXaZeF4CebOxpH3NC9aRw9s7VpCNGkf-SGnfZFNNgcphV2CcsOEzow76NyNcyDuSoHwiTpHXLdUyZcn2yFuKFp0hLdG1WMWKBHuoiqjO2_A5BAy4gEv0GmH2';
      var fcm = new FCM(serverKey);

      var URL;
      if (is_agent) {
        URL =
          'https://chat.catprowl.com/apps/cC5oq7GCBdV2vaFuNnZEDkBH/conversations/' +
          conversation_key;
      } else {
        URL = 'https://catprowl.com/chat';
      }

      var error_result = [];
      var success_result = [];

      var notifications = await Notification.find({ user_id: user._id });

      if (notifications.length > 0) {
        async.each(
          notifications,
          function (notificationObject, callback) {
            var message = {
              to: notificationObject.fcmToken,
              notification: {
                title: 'Cat Prowl',
                body: messageBody,
              },

              data: {
                title: 'Chat URL',
                body: URL,
                conversation_key: conversation_key,
                sender: sender,
              },
            };
            fcm.send(message, async function (err, response) {
              if (err) {
                error_result.push({
                  Error: JSON.parse(err),
                  Response: JSON.parse(response),
                });
                callback(err);
              } else {
                success_result.push(JSON.parse(response));
                callback(null);
              }
            });
          },
          function (err) {
            if (err) {
              console.log(error_result);
              // res.json({
              //   status: 500,
              //   data: error_result,
              // });
            } else {
              console.log(success_result);
              // res.json({ status: 200, data: success_result });
            }
          },
        );
        return true;
      }
    } catch (error) {
      next(error);
    }
  },
  webNotification: async (req, res, next) => {
    try {
      const { body: payload } = req;

      let language = 'en';
      if (req.headers && req.headers['accept-language'] == 'es') {
        language = 'es';
      }

      // Calculate difference betweem current time and channel's last message
      if (payload?.channel_id) {
        const channel = await Channel.findById(payload?.channel_id);
        const now = new Date().getTime();
        const last_message_in_channel = new Date(
          channel?.last_message_at,
        ).getTime();
        const minutes = parseInt(
          (Math.abs(now - last_message_in_channel) / (1000 * 60)) % 60,
        );

        // If notification is for message, send 1 message per hour
        if (
          channel?.last_message_at !== null &&
          payload?.notification === 'message' &&
          minutes < 60
        ) {
          await Channel.findByIdAndUpdate(
            payload?.channel_id,
            {
              last_message_at: Date.now(),
            },
            { new: true },
          );
          // important return statement
          return res.json(false);
        }
      }

      if (payload?.method == 'phone') {
        await sendNotificationOnPhone(payload, language);
      } else if (payload?.method === 'email') {
        await sendNotificationOnEmail(payload, language);
      }

      // Update channel last message time after sending notification
      if (payload?.channel_id) {
        await Channel.findByIdAndUpdate(
          payload?.channel_id,
          {
            last_message_at: Date.now(),
          },
          { new: true },
        );
      }

      res.json({ status: 200, message: notificationSent });
    } catch (error) {
      console.log(error);
      // next(error);
    }
  },
};
