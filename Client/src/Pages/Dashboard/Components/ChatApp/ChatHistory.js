
import { Fragment, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import moment from "moment";

import UserAvatar from "./UserAvatar";
import styles from "./style";
import { useUserContext } from "../../context/userContext";
import {
  isLastMessage,
  isSameSender,
  showReceiverTimeSpan,
  showSenderTimeSpan,
} from "../../helpers/ChatApp";

const AlwaysScrollToBottom = ({ scrollToBottom }) => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView(), [scrollToBottom]);
  return <div ref={elementRef} />;
};

const ChatHistory = ({
  messages,
  theme,
  selectedChat,
  scrollToBottom,
  selectedChannel,
}) => {
  const { userData } = useUserContext();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/user/profile", {
      state: { email: selectedChat?.email },
    });
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={2} p="15px 15px 0 15px">
        {messages?.map((message, i) => (
          <Fragment key={message?._id}>
            {message?.sender_id === userData?._id ? (
              // Right Card
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={2} />
                  <Grid item xs={10} sx={styles.rightMessageWrapper}>
                    <Box sx={styles.rightMessageRoot}>
                      <Card sx={styles.rightCardRoot}>
                        <CardContent sx={styles.cardContent}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              {message?.type === "text" && (
                                <Typography
                                  variant="body2"
                                  color={
                                    theme.palette.mode === "dark"
                                      ? "dark.900"
                                      : ""
                                  }
                                  sx={styles.breakWord}
                                  lineHeight="20px"
                                  mb={0}
                                >
                                  {message?.message}
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      {showSenderTimeSpan(
                        messages,
                        message,
                        userData?._id
                      ) && (
                          <span style={styles.rightMessageTime}>
                            {moment(message?.createdAt).fromNow()}
                          </span>
                        )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ) : // left card
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={7} sx={styles.leftMessageWrapper}>
                    {(isSameSender(messages, message, i, userData?._id) ||
                      isLastMessage(messages, i, userData?._id)) && (
                        <UserAvatar
                          src={selectedChat.chatImage}
                          fullName={selectedChat?.name}
                          onClick={navigateToProfile}
                          customeStyle={styles.leftMessgeAvatar}
                        />
                      )}
                    <Box
                      sx={{
                        ...styles.leftMessageBox,
                        marginLeft:
                          isSameSender(messages, message, i, userData?._id) ||
                            isLastMessage(messages, i, userData?._id)
                            ? "0px"
                            : "43px",
                      }}
                    >
                      <Card sx={styles.leftMessageCard}>
                        <CardContent sx={styles.leftMessageCardContent}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              {message?.type === "text" && (
                                <Typography
                                  variant="body2"
                                  mb={0}
                                  lineHeight="20px"
                                  sx={styles.breakWord}
                                >
                                  {message?.message}
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      {showReceiverTimeSpan(
                        messages,
                        message,
                        userData?._id
                      ) && (
                          <span style={styles.leftMessageTime}>
                            {moment(message?.createdAt).fromNow()}
                          </span>
                        )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Fragment>
        ))}
      </Grid>
      <AlwaysScrollToBottom scrollToBottom={scrollToBottom} />
    </Grid>
  );
};

export default ChatHistory;
