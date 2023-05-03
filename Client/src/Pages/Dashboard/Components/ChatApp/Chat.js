import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Box,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  useMediaQuery,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import UserAvatar from "./UserAvatar";
import { useUserContext } from "../../context/userContext";
import ChatHistory from "./ChatHistory";
import MainCard from "../shared/MainCard";
import styles from "./style";
import { fetchAllMessages, fetchAllChannel } from "../../api/chat";
import { socket } from "../../helpers/sockets";
import MessageInput from "./MessageInput";

const Chat = ({
  selectedChat,
  messagesLoading,
  setMessagesLoading,
  setSelectedChat,
  selectedChannel,
  pageRef,
  handleAddPage,
  setSelectedChannel,
  setChannels,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [scrollToBottom, setScrollToBottom] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const { state } = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [appendMsg, setAppendMsg] = React.useState({});
  const paginationRef = React.useRef();
  const toastId = React.useRef(null);


  async function fetchAllMessageFn(page) {
    try {
      setMessagesLoading(true);
      setLoading(false);
      const payload = {
        channel_id: selectedChat?.channelId,
      };
      const { data, pagination } = await fetchAllMessages(payload, page);
      handleAddPage();
      paginationRef.current = pagination;
      setMessages(data);
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
        const payload = {
          channel_id: selectedChat?.channelId,
        };
        paginationRef.current = {};
        const { data, pagination } = await fetchAllMessages(
          payload,
          pageRef.current
        );
        handleAddPage();
        paginationRef.current = pagination;
        setMessages((prev) => [...data, ...prev]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  React.useEffect(() => {
    if (selectedChat) {
      fetchAllMessageFn(1);
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
      userData?._id !== appendMsg?.sender_id &&
      selectedChat?.channelId === appendMsg?.channel_id
    ) {
      setMessages((prev) => [...prev, appendMsg]);
      setScrollToBottom(false);
      socket.emit("readMessage", appendMsg?.channel_id);
      // await readMessage({ channel_id: appendMsg?.channel_id });
    } else {
      const { data } = await fetchAllChannel();
      setChannels(data);
    }
  }, [appendMsg]);

  const navigateToProfile = () => {
    navigate("/user/profile", {
      state: { email: selectedChat?.email },
    });
  };


  return (
    <MainCard
      sx={{
        width: "100%",
        display: {
          xs: !selectedChat && mobile ? "none" : "block",
        },
        position: "relative"
      }}
    >
      {
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
                        onClick={navigateToProfile}
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
      }
    </MainCard>
  );
};

export default Chat;
