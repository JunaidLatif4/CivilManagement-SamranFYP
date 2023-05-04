const { Schema, model } = require('mongoose');

const ChannelSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "projectModel"
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    hasUnreadMessage: {
      type: Boolean,
      default: false,
    },
    last_message_at: {
      type: Schema.Types.Date,
      default: null,
    },
    latestMessage: {
      type: Schema.Types.Date,
      default: null,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    chatImage: {
      type: String,
    },
    chanelName: {
      type: String,
    },
    type: {
      type: String,
      enum: {
        values: ['single', 'group'],
      },
      default: "single"
    },
  },
  { timestamps: true },
);

module.exports = model('ChannelModel', ChannelSchema);