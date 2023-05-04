import moment from "moment";

export const showSenderTimeSpan = (messages, message, userId) => {
  const msgIndex = messages?.findIndex((msg) => msg?._id === message?._id);
  const currMsg = message;
  const currTime = moment(currMsg?.createdAt).fromNow();
  const nextMsg = messages?.[msgIndex + 1];
  const nextTime = moment(nextMsg?.createdAt).fromNow();

  if (currTime === "a few seconds ago" && nextTime === "in a few seconds") {
    return false;
  }

  if (
    currTime === nextTime &&
    currMsg?.sender_id === userId &&
    nextMsg?.sender_id === userId
  ) {
    return false;
  }
  return true;
};

export const showReceiverTimeSpan = (messages, message, userId) => {
  const msgIndex = messages?.findIndex((msg) => msg?._id === message?._id);
  const currMsg = message;
  const currTime = moment(currMsg?.createdAt).fromNow();
  const nextMsg = messages?.[msgIndex + 1];
  const nextTime = moment(nextMsg?.createdAt).fromNow();

  if (currTime === "a few seconds ago" && nextTime === "in a few seconds") {
    return false;
  }

  if (
    currTime === nextTime &&
    currMsg?.sender_id === nextMsg?.sender_id &&
    currMsg?.sender_id !== userId
  ) {
    return false;
  }
  return true;
};

export const isSameSender = (messages, m, i, userId) =>
  i < messages.length - 1 &&
  (messages?.[i + 1]?.sender_id !== m?.sender_id ||
    (messages?.[i + 1]?.sender_id === undefined &&
      messages?.[i].sender_id !== userId));

export const isLastMessage = (messages, i, userId) =>
  i === messages.length - 1 &&
  messages?.[messages.length - 1]?.sender_id !== userId &&
  messages?.[messages.length - 1]?.sender_id;
