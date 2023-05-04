import React from "react";

// MUI | ANT-D :
import { Grid, IconButton, TextField, Tooltip, CircularProgress, } from "@mui/material";
import AttachmentTwoToneIcon from "@mui/icons-material/AttachmentTwoTone";
import SendIcon from "@mui/icons-material/Send";

// APIs :
import { CreateMessageAPI } from "API/chat";
// import { createMessage, webNotification } from "API/chat";
// Redux :
import { useSelector } from "react-redux";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import styles from "./style";





const MessageInput = ({ selectedChannel, selectedChat, setMessages, setScrollToBottom }) => {

  const UserData = useSelector(state => state?.userData);

  const [message, setMessage] = React.useState("");
  const [fileLoading, setFileLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);

  const handleOnSend = async () => {
    if (!message) {
      return;
    }
    const ID = Date.now();
    try {
      setMessage("");
      const payload = {
        channel_id: selectedChat?.channelId,
        message,
        type: "text",
        receiver_id: selectedChat?._id,
      };
      const payloadMsg = { ...payload, sender_id: UserData?._id, _id: ID };
      setMessages((prev) => [...prev, payloadMsg]);
      setScrollToBottom(true);
      const { data } = await CreateMessageAPI(payload);

      setScrollToBottom(false);
      setMessages((prev) => {
        const messages = [...prev];
        const msgIndex = messages?.findIndex(({ _id }) => _id === ID);
        messages[msgIndex] = data;
        return messages;
      });


      // const notificationPayload = {
      //   channel_id: selectedChannel?._id,
      //   notification: "message",
      //   method: "phone",
      //   user_name: UserData?.fullName,
      //   // email: selectedChat?.email,
      //   // from: UserData?.phoneNumber,
      //   to: selectedChat?.phoneNumber,
      // };
      // await webNotification(notificationPayload);
    } catch (error) {
      setScrollToBottom(false);
      setMessages((prev) => {
        const messages = [...prev];
        const msgIndex = messages?.findIndex(({ _id }) => _id === ID);
        messages?.splice(msgIndex, 1);
        return messages;
      });
      toast.error(error?.errMsg);
      console.log("error", error);
    }
  };

  const handleEnter = (event) => {
    if (event?.key !== "Enter") {
      return;
    }
    handleOnSend();
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChangeFile = async (e) => {
    // try {
    //   setFileLoading(true);
    //   const userImage = e.target?.files[0];
    //   if (!userImage?.type.match(fileTypes)) {
    //     throw Error(t("invalidFileVideo"));
    //   }
    //   const fileSize = userImage.size;
    //   if (userImage?.type?.match(imageFileTypes) && fileSize > 10e6) {
    //     throw Error(t("fileSize"));
    //   }
    //   if (userImage?.type?.match(videoFileTypes) && fileSize > 15e6) {
    //     throw Error(t("videoFileSize"));
    //   }
    //   const formData = new FormData();
    //   formData.append("channel_id", selectedChat?.channelId);
    //   formData.append("type", "attachment");
    //   formData.append("attachment", userImage);
    //   formData.append("receiver_id", selectedChat?._id);
    //   setScrollToBottom(true);
    //   const { data } = await createMessage(formData);
    //   setMessages((prev) => [...prev, data]);
    //   setScrollToBottom(false);
    // } catch (error) {
    //   toast.error(error?.errMsg || error?.message || "Unable to upload video");
    //   console.log({ error });
    //   setScrollToBottom(false);
    // } finally {
    //   setFileLoading(false);
    // }
  };

  return (
    <Grid container spacing={1} alignItems="center" p="0 10px 10px 20px">
      <Grid item>
        {fileLoading ? (
          <CircularProgress sx={{ padding: "10px" }} />
        ) : (
          <>
            <input
              type="file"
              id="upload_button"
              hidden
              ref={hiddenFileInput}
              onChange={handleChangeFile}
            />
            <Tooltip title="Attach photos, videos and file">
              <IconButton size="large" onClick={handleClick}>
                <AttachmentTwoToneIcon sx={styles.attachmentIcon} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Grid>
      <Grid item xs zeroMinWidth>
        <TextField
          sx={styles.messageTextField}
          fullWidth
          label="Type a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleEnter}
        />
      </Grid>
      <Grid item>
        <IconButton size="large">
          <SendIcon sx={styles.attachmentIcon} onClick={handleOnSend} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MessageInput;
