import React from "react";
import { FaFacebook } from "react-icons/fa";
import "./Footer.css";
import { images } from "../../../public/assets/images";

const Footer = () => {
  return (
    <footer className="container-footer">
      <div className="footer-logos">
        <img src={images.LogoGreen} alt="Green Logo" className="footer-logo" />
        <img
          src={images.LogoPurple}
          alt="Purple Logo"
          className="footer-logo"
        />
      </div>

      <div className="footer-slogan">Connecting People</div>

      <div className="footer-contact">
        <p>Email: info@closer.com</p>
        <p>Phone: 123-456-7890</p>
      </div>

      <div className="footer-social-media">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebook />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon "
        >
          <img className="social-icon-x" src={images.Xlogo} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
