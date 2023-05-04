import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// MUI | ANT-D :
import { Grid, Box, IconButton, Typography, useTheme, Tooltip, useMediaQuery, Backdrop, CircularProgress, Button, } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components :
import UserAvatar from "./UserAvatar";
import ChatHistory from "./ChatHistory";
import MessageInput from "./MessageInput";
import MainCard from "../shared/MainCard";

// APIs :
import { GetAllMessagesByChannelAPI } from "API/chat";
// Redux :
import { useSelector } from "react-redux";
// Helpers :
import { toast } from "react-toastify";
import { socket } from "../../helpers/sockets";

// CSS :
import styles from "./style";






const Chat = ({ selectedChat, setSelectedChat, messagesLoading, setMessagesLoading, selectedChannel, setSelectedChannel, pageRef, handleAddPage }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const UserData = useSelector(state => state.userData);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const [scrollToBottom, setScrollToBottom] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [appendMsg, setAppendMsg] = React.useState({});
  const paginationRef = React.useRef();
  const toastId = React.useRef(null);


  const gettingAllMessages = async (page) => {
    try {
      setMessagesLoading(true);
      setLoading(false);
      const res = await GetAllMessagesByChannelAPI(selectedChat?.channelId, page);
      if (res.error != null) {
        toast.error(res.error)
        return
      }
      let messagesData = res.data?.result
      let pagination = res.data?.pagination
      handleAddPage();
      paginationRef.current = pagination;
      setMessages(messagesData);
    } catch (error) {
      console.log({ error });
    } finally {
      setMessagesLoading(false);
    }
  }

  const handleScroll = async (e) => {
    try {
      const post = e.target.scrollTop;
      if (
        post === 0 &&
        !loading &&
        pageRef.current > 1 &&
        pageRef.current <= paginationRef.current.totalPages
      ) {
        setLoading(true);
        paginationRef.current = {};
        const res = await GetAllMessagesByChannelAPI(selectedChat?.channelId, pageRef.current);
        if (res.error != null) {
          toast.error(res.error)
          return
        }
        let messagesData = res.data?.result
        let pagination = res.data?.pagination
        handleAddPage();
        paginationRef.current = pagination;
        setMessages((prev) => [...messagesData, ...prev]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  React.useEffect(() => {
    if (selectedChat) {
      gettingAllMessages(1);
    }
  }, [selectedChat]);

  React.useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setScrollToBottom(true);
      setAppendMsg(newMessage);
    });
  }, []);

  React.useEffect(async () => {
    if (
      UserData?._id !== appendMsg?.sender_id &&
      selectedChat?.channelId === appendMsg?.channel_id
    ) {
      setMessages((prev) => [...prev, appendMsg]);
      setScrollToBottom(false);
      socket.emit("readMessage", appendMsg?.channel_id);
    }
  }, [appendMsg]);

  const navigateToProfile = () => {
    navigate("/user/profile", {
      state: { email: selectedChat?.email },
    });
  };


  return (
    !selectedChat ?
      <Box sx={styles.notFoundMessage}>
        <span>Select User</span>
      </Box>
      : <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={0.5}
            p="10px 25px"
            boxShadow="0 0 4px rgb(0 0 0 / 20%)"
          >
            <Grid item>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ flexWrap: "nowrap" }}
              >
                <Grid item sx={{ display: { xs: "block", sm: "none" } }}>
                  <IconButton
                    size="medium"
                    onClick={() => setSelectedChat({})}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item sx={{ cursor: "pointer" }}>
                  <UserAvatar
                    src={selectedChat?.chatImage}
                    fullName={selectedChat?.name}
                  />
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        component="div"
                        fontSize="20px"
                        fontWeight="600"
                        onClick={navigateToProfile}
                        sx={{ cursor: "pointer" }}
                      >
                        {selectedChat?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} pt="10px !important">
          <div style={styles.messageScrollBar} onScroll={handleScroll}>
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )}
            {messagesLoading ? (
              <Box sx={styles.messageNotFound}>
                <CircularProgress />
              </Box>
            ) : messages?.length > 0 ? (
              <ChatHistory
                messages={messages}
                theme={theme}
                selectedChat={selectedChat}
                scrollToBottom={scrollToBottom}
                selectedChannel={selectedChannel}
              />
            ) :
              <Box sx={styles.messageNotFound}>"No Message Found</Box>
            }
          </div>
        </Grid>
        <Grid item xs={12} pt="10px !important">
          <MessageInput
            selectedChannel={selectedChannel}
            selectedChat={selectedChat}
            setMessages={setMessages}
            setScrollToBottom={setScrollToBottom}
          />
        </Grid>
      </Grid>
  );
};

export default Chat;
