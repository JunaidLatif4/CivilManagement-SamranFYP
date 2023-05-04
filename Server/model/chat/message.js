const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    sender_id: {
      type: String,
      ref: 'User',
    },
    senderName: {
      type: String,
    },
    receiver_id: {
      type: String,
    },
    channel_id: {
      type: String,
      ref: 'Channel',
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      lowercase: true,
      default: 'unread',
    },
    type: {
      type: String,
      lowercase: true,
    },
    attachment: String,
    fileType: String,
    fileName: String,
    reply_of: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    seen_by: {
      type: Array,
      default: [],
    },
    time: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true },
);

module.exports = model('Message', MessageSchema);
