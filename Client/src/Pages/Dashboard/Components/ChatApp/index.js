import * as React from "react";
import { useLocation } from "react-router-dom";

// MUI | ANT-D :
import { Box, Modal } from "@mui/material";

//Components :
import Chat from "./Chat";
// import UserList from "./UserList";

// API :
import { GetChannelByProjectAPI } from "API/chat";
// Redux :
import { useSelector } from "react-redux";
// Helpers :
import { socket } from "Utils/sockets";

import styles from "./style";
import { toast } from "react-toastify";






const defaultStyle = {
  position: 'absolute',
  top: '10%',
  left: '20%',
  right: '20%',
  bottom: '20%',
  // transform: 'translate(-50%, -50%)',
  // width: 350,
  // height: 540,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: ".5rem",
  py: 2,
  px: 2,
  zIndex: "500",
  borderColor: "var(--themeColorGreen)",
  height: "fit-content"
}
const ChatApp = ({ openModal, closeModal, selectProject }) => {
  const { state } = useLocation();

  const UserData = useSelector(state => state.userData);

  const [selectedChat, setSelectedChat] = React.useState({});
  const [messagesLoading, setMessagesLoading] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState({});

  const pageRef = React.useRef(1);

  const handleAddPage = () => {
    pageRef.current += 1;
  };

  const handleResetPage = () => {
    pageRef.current = 1;
  };


  const gettingChannelData = async () => {

    if (!openModal || !selectProject) {
      setSelectedChat({})
      setSelectedChannel({})
      return
    }

    try {
      const res = await GetChannelByProjectAPI(selectProject?._id);
      if (res.error != null) {
        toast.error(res.error)
        return
      }
      let channelData = res.data?.result
      setMessagesLoading(true);
      handleResetPage();
      setSelectedChat({
        name: channelData?.projectId?.title,
        chatImage: null,
        channelId: channelData?._id,
        type: channelData?.type,
        email: "",
        _id: UserData?._id,
        phoneNumber: "",
        users: channelData?.users,
      });
      setSelectedChannel(channelData);
      // const channelIds = data?.map(({ _id }) => _id);
      socket?.emit("joinChannel", [channelData?._id]);
    } catch (error) {
      console.log({ error });
    }
  }

  React.useEffect(() => {
    gettingChannelData();
    // if (UserData?.role === "client") {
    //   socket?.on("newChannelCreated", (channel) => {
    //     if (channel?.users.includes(UserData?._id)) {
    //       setChannels((prev) => [...prev, channel]);
    //     }
    //     socket?.emit("joinChannel", [channel?._id]);
    //   });
    // }
  }, [openModal, selectProject]);


  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
      >
        <Box sx={styles.chatRoot}>
          {/* <UserList
            channels={channels}
            setChannels={setChannels}
            channelsData={channelsData}
            channelsLoading={channelsLoading}
            selectChat={selectChat}
            selectedChat={selectedChat}
            setSelectedChannel={setSelectedChannel}
            openGroup={openGroup}
            setOpenGroup={setOpenGroup}
          /> */}
          <Chat
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            messagesLoading={messagesLoading}
            setMessagesLoading={setMessagesLoading}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            pageRef={pageRef}
            handleAddPage={handleAddPage}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ChatApp;
