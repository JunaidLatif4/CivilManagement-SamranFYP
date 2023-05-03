import * as React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { socket } from "../../helpers/sockets";
import UserList from "./UserList";
import Chat from "./Chat";
import styles from "./style";
import { fetchAllChannel } from "../../api/chat";
import { getChannel } from "../../helpers/getChannel";
import { useUserContext } from "../../context/userContext";

const ChatApp = () => {
  const pageRef = React.useRef(1);

  const { userData } = useUserContext();
  const { state } = useLocation();
  const [channels, setChannels] = React.useState([]);
  const [channelsData, setChannelData] = React.useState([]);
  const [channelsLoading, setChannelsLoading] = React.useState(true);
  const [selectedChat, setSelectedChat] = React.useState({});
  const [messagesLoading, setMessagesLoading] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState({});
  const [openGroup, setOpenGroup] = React.useState(false)

  const handleAddPage = () => {
    pageRef.current += 1;
  };

  const handleResetPage = () => {
    pageRef.current = 1;
  };

  const selectChat = ({
    name,
    chatImage,
    channelId,
    type,
    email,
    _id,
    phoneNumber,
    users,
  }) => {
    if (selectedChat?.channelId !== channelId) {
      setMessagesLoading(true);
      handleResetPage();
      setSelectedChat({
        name,
        chatImage,
        channelId,
        type,
        email,
        _id,
        phoneNumber,
        users,
      });
    }
  };

  async function fetchAllChannelFun() {
    try {
      setChannelsLoading(true);
      const { data } = await fetchAllChannel();
      if (state?.channel) {
        const { chatImage, name, email, _id, phoneNumber, users, type } = getChannel({
          channel: state?.channel,
          currentuser: userData,
        });
        selectChat({
          name,
          chatImage,
          channelId: state?.channel?._id,
          email,
          _id,
          phoneNumber,
          users,
          type
        });
        setSelectedChannel(state?.channel);
      }
      setChannels(data);
      setChannelData(data);
      const channelIds = data?.map(({ _id }) => _id);
      socket?.emit("joinChannel", channelIds);
    } catch (error) {
      console.log({ error });
    } finally {
      setChannelsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchAllChannelFun();
    if (userData?.role === "client") {
      socket?.on("newChannelCreated", (channel) => {
        // if (channel?.professional_id?._id === userData?._id) {
        if (channel?.users.includes(userData?._id)) {
          setChannels((prev) => [...prev, channel]);
        }
        socket?.emit("joinChannel", [channel?._id]);
      });
    }
  }, [state]);


  return (
    <>
      <Box sx={styles.chatRoot}>
        <UserList
          channels={channels}
          setChannels={setChannels}
          channelsData={channelsData}
          channelsLoading={channelsLoading}
          selectChat={selectChat}
          selectedChat={selectedChat}
          setSelectedChannel={setSelectedChannel}
          openGroup={openGroup}
          setOpenGroup={setOpenGroup}
        />
        <Chat
          selectedChat={selectedChat}
          messagesLoading={messagesLoading}
          setMessagesLoading={setMessagesLoading}
          setSelectedChat={setSelectedChat}
          selectedChannel={selectedChannel}
          pageRef={pageRef}
          handleAddPage={handleAddPage}
          setSelectedChannel={setSelectedChannel}
          setChannels={setChannels}
        />
      </Box>
    </>
  );
};

export default ChatApp;
