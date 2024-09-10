import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserCardSmall.css";
import { images } from "../../public/assets/images";
import multiavatar from "@multiavatar/multiavatar/esm";

const UserCardSmall = ({ user, onViewProfileClick, onChatClick }) => {
  const [avatarSvg, setAvatarSvg] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const name = user.firstName || "Unknown Name";

  useEffect(() => {
    if (user.profile_picture) {
      setAvatarSvg(null);
    } else {
      try {
        const svg = multiavatar(name);
        setAvatarSvg(svg);
      } catch (error) {
        setAvatarError(true);
      }
    }
  }, [name, user.profile_picture]);

  return (
    <div className="usercard-small">
      {avatarError ? (
        <img
          src={images.LogoGreen}
          alt="Fallback Avatar"
          className="usercard-small-img"
        />
      ) : (
        <>
          {user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="User Avatar"
              className="usercard-small-img"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: avatarSvg }}
              className="avatar-svg"
            />
          )}
        </>
      )}
      <div className="usercard-small-info">
        <p className="usercard-small-name">
          {user.firstName} {user.lastName}
        </p>
        <p className="usercard-small-location">
          {user.location?.[0]?.city || "Unknown location"}
        </p>
      </div>
      <div className="usercard-small-buttons">
        <button onClick={onViewProfileClick} className="usercard-button">
          View Profile
        </button>
        <button onClick={onChatClick} className="usercard-button">
          Chat
        </button>
      </div>
    </div>
  );
};

UserCardSmall.propTypes = {
  user: PropTypes.object.isRequired,
  onViewProfileClick: PropTypes.func.isRequired,
  onChatClick: PropTypes.func.isRequired,
};

export default UserCardSmall;
