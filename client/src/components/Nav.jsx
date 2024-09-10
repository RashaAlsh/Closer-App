import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import "../../public/index.css";
import TEST_ID from "./Nav.testid";
import { FormContext } from "../context/formContext";
import { images } from "../../public/assets/images";
import { useUser } from "../hooks/useUser";
import { AiFillWechat } from "react-icons/ai";
import { MessageContext } from "../context/messageContext";

const Nav = () => {
  const { isSignIn, setIsSignIn } = useContext(FormContext);
  const { newMessageCount } = useContext(MessageContext);
  const { user } = useUser();
  const navigate = useNavigate();
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isSignIn");
    setIsSignIn(false);
    setProfileMenuVisible((prevVisible) => !prevVisible);
    navigate("/");
  }

  const handleAvatar = () => {
    setProfileMenuVisible((prevVisible) => !prevVisible);
  };
  const goMyProfile = () => {
    navigate("/create-profile");
    setProfileMenuVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="nav">
      <img src={images.LogoPurple} alt="Logo" className="logo" />
      <ul className="ul-text poppins-bold">
        <Link
          to="/"
          data-testid={TEST_ID.linkToHome}
          style={{ display: isSignIn ? "inline" : "none" }}
        >
          <li>Home</li>
        </Link>
        <Link to="/about-us">
          <li>About Us</li>
        </Link>
        <Link
          to="/sign-in"
          data-testid={TEST_ID.linkToSignIn}
          style={{ display: isSignIn ? "none" : "inline" }}
        >
          <li>Sign in</li>
        </Link>
        <Link to="/sign-up" style={{ display: isSignIn ? "none" : "inline" }}>
          <li>Sign up</li>
        </Link>
        {isSignIn && (
          <>
            <Link to="/chat">
              <li
                className="chat-icon-container"
                style={{ display: isSignIn ? "inline" : "none" }}
              >
                <AiFillWechat className="chat-icon" />
                {newMessageCount > 0 && (
                  <div className="chat-notification">{newMessageCount}</div>
                )}
              </li>
            </Link>
            <li className="avatar-container">
              <div className="header-avatar" onClick={handleAvatar}>
                <img
                  src={user?.profile_picture}
                  className="li-img avatar"
                  alt="My Profile"
                />
                <span className="">{user?.firstName}</span>
              </div>
              {isProfileMenuVisible && (
                <div className="profile-menu">
                  <button onClick={goMyProfile}>My profile</button>
                  <button onClick={handleSignOut}>Sign out</button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
      <ul className="ul-img">
        <Link to="/home">
          <li>
            <img src={images.Globe} className="li-img" alt="Map" />
          </li>
        </Link>
        <Link to="/inbox">
          <li>
            <img src={images.Mail} className="li-img" alt="Messages" />
          </li>
        </Link>
        <Link to="/settings">
          <li>
            <img src={images.Settings} className="li-img" alt="Settings" />
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <img src={images.AccountCircle} className="li-img" alt="Profile" />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
