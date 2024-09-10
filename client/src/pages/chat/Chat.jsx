import React, { useContext, useState, useEffect } from "react";
import SBConversation from "@sendbird/uikit-react/GroupChannel";
import SBChannelList from "@sendbird/uikit-react/GroupChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import SendBird from "sendbird";
import "./Chat.css";
import { UserContext } from "../../context/userContext";
import { MessageContext } from "../../context/messageContext"; // Import context
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { createOrGetChannelWithUser } from "../../util/createOrGetChannelWithUser";
import "@sendbird/uikit-react/dist/index.css";
import { appId } from "../../config/config";

export const Chat = () => {
  const { user } = useContext(UserContext);
  const { setNewMessageCount, error, setError } = useContext(MessageContext);
  const [userId, setUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sb, setSb] = useState(null);
  const [targetedUserId, setTargetedUserId] = useState(null);
  const [targetedUserName, setTargetedUserName] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTargetedUserId(id);
    }
  }, [id]);

  const onReceived = (data) => {
    setTargetedUserName(data?.user?.firstName);
  };

  const { performFetch } = useFetch(`/user/${targetedUserId}`, onReceived);

  useEffect(() => {
    if (targetedUserId) {
      performFetch({ method: "GET" });
    }
  }, [targetedUserId]);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setCurrentUsername(user.firstName);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const sbInstance = new SendBird({ appId });
      const connectUserId = targetedUserId
        ? targetedUserId.toString()
        : userId.toString();

      sbInstance.connect(connectUserId, (connectedUser, error) => {
        if (error) {
          setError(error);
          return;
        }
        setSb(sbInstance);
      });
    }
  }, [userId, targetedUserId, appId]);

  useEffect(() => {
    if (sb && userId && currentChannelUrl) {
      const HANDLER_ID = `chat_handler_${userId}`;
      const channelHandler = new sb.ChannelHandler();

      channelHandler.onMessageReceived = (channel) => {
        if (channel.url !== currentChannelUrl) {
          setNewMessageCount((prevCount) => prevCount + 1);
        }
      };
      sb.addChannelHandler(HANDLER_ID, channelHandler);

      return () => {
        sb.removeChannelHandler(HANDLER_ID);
      };
    }
  }, [sb, userId, currentChannelUrl, setNewMessageCount]);

  useEffect(() => {
    if (sb) {
      createOrGetChannelWithUser({
        sb,
        userId,
        targetedUserId,
        name: targetedUserName,
        setError,
        currentUsername,
        setCurrentChannelUrl,
      });
    }
  }, [sb, targetedUserId]);

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          {error && <div className="error">{error.toString()}</div>}
          <SBChannelList
            selectedChannelUrl={currentChannelUrl}
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url);
            }}
            onChannelSelect={(channel) => {
              setCurrentChannelUrl(channel?.url);
              setNewMessageCount(0);
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <SBChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
