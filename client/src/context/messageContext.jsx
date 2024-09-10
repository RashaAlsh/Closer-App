// MessageContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import SendBird from "sendbird";
import { UserContext } from "./userContext";
import { appId } from "../config/config";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [sb, setSb] = useState(null);
  const [error, setError] = useState(null);

  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      const sbInstance = new SendBird({ appId });
      //connect to SendBird
      sbInstance.connect(userId.toString(), (connectedUser, error) => {
        if (error) {
          setError(error);
          return;
        }
        setSb(sbInstance);
        // Global Message Handler Setup
        const HANDLER_ID = `global_handler_${userId}`;
        const globalChannelHandler = new sbInstance.ChannelHandler();

        globalChannelHandler.onMessageReceived = (channel, message) => {
          if (message?._sender?.userId !== userId) {
            setNewMessageCount((prevCount) => prevCount + 1);
          }
        };
        sbInstance.addChannelHandler(HANDLER_ID, globalChannelHandler);
      });
    }

    return () => {
      if (sb) {
        sb.disconnect();
      }
    };
  }, [userId, appId]);

  return (
    <MessageContext.Provider
      value={{ sb, newMessageCount, setNewMessageCount, error, setError }}
    >
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
