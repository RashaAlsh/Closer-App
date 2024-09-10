import React, { useContext } from "react";
import "./AboutUs.css";
import { images } from "../../../public/assets/images";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/formContext";

const AboutUs = () => {
  const navigate = useNavigate();
  const { isSignIn } = useContext(FormContext);
  return (
    <div className="container-about-us">
      <div className="about-us">
        <header className="about-us-header">
          <h1>Closer</h1>
        </header>
        <section className="about-us-content">
          <p className="about-us-description-big">
            Welcome! Are you ready to find people like you?
          </p>
          <p className="about-us-description">
            We&apos;re here to help you build more meaningful connections and
            make the most of your local community. Our app is designed to make
            it easier for you to discover people nearby, explore shared
            interests, and start conversations.If you wish, you can even arrange
            to meet in person and share your experiences through reviews.
          </p>
          <button
            className="about-us-btn"
            onClick={() => navigate("/sign-in")}
            style={{ display: isSignIn ? "none" : "inline-block" }}
          >
            Sign in
          </button>
          <p className="about-us-description">
            What truly matters to us is creating a space where genuine support
            and strong connections thrive. We believe that together, we can
            build a more connected and supportive community.
          </p>{" "}
        </section>
      </div>
      <div className="images-wrapper-about-us">
        <div className="about-us-images">
          <div className="about-us-image">
            <img
              src={images.Meeting1}
              alt="People Meeting 1"
              className="imagi"
            />
          </div>
          <div className="about-us-image">
            <img
              src={images.Meeting2}
              alt="People Meeting 2"
              className="imagi"
            />
          </div>
          <div className="about-us-image">
            <img
              src={images.Meeting3}
              alt="People Meeting 3"
              className="imagi"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
