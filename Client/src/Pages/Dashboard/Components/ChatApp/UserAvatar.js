import { Avatar, Badge } from "@mui/material";
import AvatarImg from "../../images/notification.png";
import styles from "./style";

const generateAvatar = (fullName) => {
  let a;
  if (fullName?.split(" ").length >= 2) {
    a = `${fullName?.split(" ")[0].substring(0, 1).toUpperCase()}${fullName?.split(" ")[1]
      .substring(0, 1)
      .toUpperCase()}`;
  } else {
    a = `${fullName?.substring(0, 2).toUpperCase()}`;
  }
  return a;
};

const avtarStyle = (customeStyle) => {
  let style;
  if (customeStyle) {
    style = {
      ...customeStyle,
      fontSize: "14px",
    };
  } else {
    style = styles.userAvatar;
  }
  return style;
};

const UserAvatar = ({ src, fullName, onClick, customeStyle }) => (
  <Badge
    overlap="circular"
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    sx={styles.badgeContent}
  >
    {src ? (
      <Avatar
        onClick={onClick}
        alt={fullName}
        src={src || AvatarImg}
        sx={avtarStyle(customeStyle)}
      />
    ) : (
      <Avatar sx={avtarStyle(customeStyle)} onClick={onClick}>
        {generateAvatar(fullName)}{" "}
      </Avatar>
    )}
  </Badge>
);
export default UserAvatar;
