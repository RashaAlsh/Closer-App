import React, { useContext, useEffect, useState } from "react";
import { SendBirdProvider } from "@sendbird/uikit-react";
import { UserContext } from "./context/userContext";
import PropTypes from "prop-types";
//import { UsersContext } from "./context/usersContext";

export const CustomSendBirdProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setNickname(user.firstName);
    }
  }, [user]);
  // const {users} = useContext(UsersContext)
  // const userListQuery = users&&users
  // console.log(userListQuery)
  return (
    <SendBirdProvider
      appId={process.env.REACT_APP_SENDBIRD_APP_ID}
      userId={userId}
      nickname={nickname}
      theme="dark"
      //  userListQuery={userListQuery}
    >
      {children}
    </SendBirdProvider>
  );
};

CustomSendBirdProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
