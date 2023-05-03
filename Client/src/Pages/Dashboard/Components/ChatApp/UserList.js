import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  // Chip,
  Divider,
  Typography,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Autocomplete,
  Button
} from "@mui/material";
import { BsPlusLg } from "react-icons/bs"
import { useTranslation } from "react-i18next";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PerfectScrollbar from "react-perfect-scrollbar";
import Badge from "@mui/material/Badge";
import MainCard from "../shared/MainCard";
import UserAvatar from "./UserAvatar";
import styles from "./style";
import { getChannel } from "../../helpers/getChannel";
import { useUserContext } from "../../context/userContext";
import { getFirstNameFromFullName, getProfessionString } from "../../helpers";
import { readMessage, fetchAllChannel, fetchAllGroupChannel } from "../../api/chat";
import { socket } from "../../helpers/sockets";



const UserList = ({
  channels,
  setChannels,
  channelsData,
  channelsLoading,
  selectChat,
  selectedChat,
  setSelectedChannel,
  openGroup,
  setOpenGroup
}) => {
  const { t, i18n } = useTranslation();
  const { userData } = useUserContext();

  const handleSearchUser = (event) => {
    const { value } = event.target;
    let users;
    if (value) {
      users = channels?.filter(
        (channel) =>
          channel?.[
            userData?.role === "agent" ? "professional_id" : "client_id"
          ]?.fullName
            .toLowerCase()
            .indexOf(value?.toLowerCase()) !== -1
      );
    } else {
      users = channelsData;
    }
    setChannels(users);
  };

  async function handleMessageCount(channel) {
    try {
      socket.emit("readMessage", channel?._id);
      // await readMessage({ channel_id: channel?._id });
      const { data } = await fetchAllChannel(i18n.language);
      const { data: groupData } = await fetchAllGroupChannel(i18n.language);
      let allChannels = data?.concat(groupData)
      setChannels(allChannels);
    } catch (error) {
      console.log({ error });
    }
  }


  return (
    <>
      <MainCard
        sx={{
          width: { xs: "100%", sm: "450px" },
          padding: "5px 0",
          display: {
            xs: !selectedChat ? "block" : "none",
            sm: "block",
          },
        }}
      >
        <Box sx={styles.userListWrapper}>
          <Box p="24px 16px" borderBottom="1px solid #90caf975">
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <OutlinedInput
                  fullWidth
                  id="input-search-header"
                  placeholder={t("search_client")}
                  sx={styles.searchTextField}
                  onChange={handleSearchUser}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon fontSize="small" />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton size="small" onClick={() => setOpenGroup(true)}>
                  <BsPlusLg />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <PerfectScrollbar style={styles.scrollBarUserList}>
            {channelsLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : channels?.length > 0 ? (
              <List component="nav" sx={styles.navList}>
                {channels.map((channel) => {
                  const {
                    chatImage,
                    name,
                    profession,
                    businessName,
                    email,
                    city,
                    _id,
                    phoneNumber,
                  } = getChannel({
                    channel,
                    currentuser: userData,
                  });
                  return (
                    <React.Fragment key={channel?._id}>
                      <ListItemButton
                        onClick={() => {
                          selectChat({
                            name,
                            chatImage,
                            channelId: channel?._id,
                            email,
                            _id,
                            phoneNumber,
                          });
                          setSelectedChannel(channel);
                          if (channel?.messageCount > 0) {
                            handleMessageCount(channel);
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <UserAvatar src={chatImage} fullName={name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={styles.textRoot}>
                              <Typography
                                variant="h6"
                                color="inherit"
                                component="span"
                                sx={styles.primaryTypographyName}
                              >
                                {businessName}
                              </Typography>
                              {/* <Typography
                              gutterBottom
                              display="block"
                              variant="caption"
                              sx={styles.primaryTextLastMsg}
                            >
                              2h ago
                            </Typography> */}
                            </Box>
                          }
                          secondary={
                            <>
                              <Box sx={styles.textRoot}>
                                <Typography
                                  variant="caption"
                                  sx={styles.secondaryTypographyName}
                                >
                                  {getFirstNameFromFullName(name)}
                                </Typography>
                                {channel?.messageCount > 0 && (
                                  <span>
                                    <Badge
                                      badgeContent={channel?.messageCount}
                                      color="primary"
                                    />
                                  </span>
                                )}
                                {/* {user.unReadChatCount !== 0 && (
                        <Chip
                          label={user.unReadChatCount}
                          component="span"
                          color="secondary"
                          sx={{
                            width: 20,
                            height: 20,
                            "& .MuiChip-label": {
                              px: 0.5,
                            },
                          }}
                        />
                      )} */}
                              </Box>
                              <span>
                                {getProfessionString(profession, t) || city}
                              </span>
                            </>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            ) : (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {t("no_user_found")}
              </span>
            )}
          </PerfectScrollbar>
        </Box>
      </MainCard>
    </>
  );
};

export default UserList;
