const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    sender_id: {
      type: String,
      require: true
    },
    senderData: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    receiver_id: {
      type: String,
    },
    channel_id: {
      type: Schema.Types.ObjectId,
      ref: 'ChannelModel',
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

MessageSchema.post('find', function(doc, next) {
  doc.populate('senderData').then(function() {
    next();
  });
});