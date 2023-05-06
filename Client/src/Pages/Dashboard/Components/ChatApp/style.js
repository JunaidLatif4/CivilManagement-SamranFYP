const marginZero = {
  margin: 0,
};

const fontSize14 = {
  fontSize: "14px",
};

const typoGraphy = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "block",
  ...marginZero,
};

export default {
  // chatRoot: {
  //   display: "flex",
  //   gap: "10px",
  // },
  chatRoot: {
    position: 'absolute',
    top: '5%',
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
  },
  mainCardRoot: {
    width: "420px",
    padding: "5px 0",
  },
  notFoundMessage: {
    width: "100%",
    height: "calc(100vh - 112px)",
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  messageNotFound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  scrollBarUserList: {
    width: "100%",
    height: "calc(100vh - 215px)",
    overflowX: "hidden",
  },
  userListWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  searchTextField: {
    borderRadius: "12px",
  },
  navList: {
    paddingTop: 0,
    "& .MuiListItemButton-root": {
      padding: "10px 15px",
      gap: "10px",
      "& .MuiListItemText-root": {
        ...marginZero,
        "& .MuiListItemText-primary": {
          ...marginZero,
        },
        "& .MuiListItemText-secondary": {
          ...marginZero,
          "& .MuiTypography-root": {
            ...marginZero,
          },
        },
      },
    },
    "& :hover": {
      backgroundColor: "#EDEDED !important",
    },
  },
  textRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryTypographyName: {
    ...typoGraphy,
  },
  secondaryTypographyName: {
    ...typoGraphy,
    ...fontSize14,
  },
  primaryTextLastMsg: {
    ...marginZero,
    ...fontSize14,
  },
  badgeContent: {
    "& .BaseBadge-badge:hover": {
      backgroundColor: "transparent !important",
    },
    "& .MuiSvgIcon-root:hover": {
      backgroundColor: "transparent !important",
    },
    "& .MuiAvatar-circular": {
      backgroundColor: "#bdbdbd !important",
    },
  },
  userAvatar: {
    width: "50px",
    height: "50px",
  },
  chatMainCard: {
    width: "100%",
  },
  moneyIcon: {
    color: "#fe9383 !important",
    fontSize: "28px",
  },
  callIcon: {
    color: "#fe9383 !important",
    fontSize: "25px",
  },
  videoCallIcon: {
    color: "#fe9383 !important",
    fontSize: "30px",
  },
  attachmentIcon: {
    color: "#fe9383 !important",
    fontSize: "25px",
  },
  messageScrollBar: {
    width: "100%",
    height: "calc(100vh - 261px)",
    overflowX: "hidden",
  },
  rightMessageWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "10px !important",
  },
  rightMessageRoot: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  rightCardRoot: {
    display: "inline-block",
    float: "right",
    boxShadow: "none",
    width: "100%",
  },
  cardContent: {
    p: "8px 12px !important",
    width: "fit-content",
    ml: "auto",
    backgroundColor: "#a1def7",
    borderRadius: "12px",
  },
  rightMessageTime: {
    fontSize: "12px",
    display: "flex",
    justifyContent: "flex-end",
    color: "gray",
  },
  leftMessageWrapper: {
    display: "flex",
    gap: "10px",
    paddingTop: "10px !important",
  },
  leftMessgeAvatar: {
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },
  leftMessageBox: {
    display: "flex",
    flexDirection: "column",
  },
  leftMessageCard: {
    display: "inline-block",
    float: "left",
    background: "#E4E6EB",
    boxShadow: "none",
    borderRadius: "12px",
    width: "fit-content",
  },
  leftMessageCardContent: {
    padding: "8px 12px !important",
  },
  breakWord: {
    wordBreak: "break-word",
  },
  leftMessageTime: {
    fontSize: "12px",
    display: "flex",
    justifyContent: "flex-start",
    color: "gray",
  },
  messageTextField: {
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "12px",
    },
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    objectFit: "cover",
  },
  pdfRoot: {
    backgroundColor: "#a1def7",
    padding: "10px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#000",
    display: "flex",
    gap: "10px",
  },
  pdfIcon: {
    fontSize: "50px",
    color: "#fe9383",
  },
  pdfText: {
    fontSize: "12px",
  },
  callLogContainer: {
    width: "fit-content",
    border: "1px solid #808080",
    padding: "10px",
    borderRadius: "10px",
  },
  groupModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: ".7rem",
    alignItems: "center",
    "& .createGroupContainer": {
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      "& > div:first-child": {
        margin: "auto",
        width: "300px"
      },
    },
    "& .inputBox": {
      display: "flex",
      flexDirection: "column",
      gap: ".5rem"
    },
    "& .title": {
      textAlign: "start",

    },
    "& .input": {
      backgroundColor: "#EDEDED",
      borderRadius: "15px",
      height: "50px",
      outline: "none",
      border: "none",
      padding: "0 15px",
    }
  },
  textareaField: {
    backgroundColor: "#EDEDED",
    borderRadius: "15px",
    maxHeight: "135px",
    minHeight: "135px",
    outline: "none",
    border: "none",
    padding: "15px",
    fontWeight: 400,
    fontSize: 14,
  },
  countDownBox: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "#8080806e",
    zIndex: "50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "no-drop"
  },
  saveButton: (theme) => ({
    background: theme.palette.primary.main,
    color: "white",
    fontSize: "1.5rem",
    margin: "0 .5rem",
    "& :hover": {
      color: "black",
    },
  })
};
