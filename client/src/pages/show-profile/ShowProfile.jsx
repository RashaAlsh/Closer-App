import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import "./ShowProfile.css";
import "../../../public/index.css";
import { images } from "../../../public/assets/images";
import Footer from "../footer/Footer";

import calculateAge from "../../util/calculateAge";

export const ShowProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${id}`,
    (data) => {
      if (data?.success) {
        setUser(data.user);
      }
    },
  );
  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return () => cancelFetch();
  }, [id]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !user) {
    return <p>No user found. You can sign in or sign up.</p>;
  }
  const age = user.birthday ? calculateAge(user.birthday) : "N/A";

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizedFirstName = capitalizeFirstLetter(user.firstName);

  return (
    <div className="show-profile-main">
      <button className="back-btn roboto-regular" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <div className="profile-container">
        <div className="profile-details">
          <div className="shprofile-top-1-box">
            <div className="pic-and-status-box">
              <div className="user-avatar-box-shprofile">
                <div className="status-box-shprofile">Hello yoll</div>
                {/* <div className="avatar-background-shprof"></div>
      <img src={images.GoldFrame} alt="Frame" className="frame" /> */}

                {user.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="shprofile-pic"
                  />
                ) : (
                  <img src={images.Ogmoji} alt="moji" className="moji" />
                )}
              </div>
            </div>
            <div className="user-info-box-shpro">
              <div className="profile-item">
                <span className="name-shprofile">{capitalizedFirstName}, </span>
                <span className="age-shpro">{age}</span>
              </div>

              <span className="shprofle-gender">{user.gender}</span>
              <button
                className="contact-btn-shprof"
                onClick={() => navigate(`/chat/${id}`)}
              >
                Contact {capitalizedFirstName}
              </button>
            </div>
          </div>
          <div className="bio-hobby-lan-shp">
            <div className="container-for-bio-shprofile1">
              <label className="shprofile-bio-title">About me</label>
              <div className="bio-shpro">
                {/*    
        <div className='bio-shpro-title-box'>
     
        </div> */}
                {user.bio && user.bio.length > 0 ? (
                  <span className="user-bio-shprofile">{user.bio}</span>
                ) : (
                  <span className="user-bio-shprofile">N/A</span>
                )}
              </div>
            </div>
            <div>
              <div className="interests-lang-shprofile">
                <div className="interests-interest-box">
                  <label className="shprofile-bio-title">Interests</label>

                  <div className="hobby-box-shprofile">
                    {/* <label className='hobby-title-shprofile'>Hobbies</label> */}
                    {user.hobbies && user.hobbies.length > 0 ? (
                      <ul className="ulshprofile">
                        {user.hobbies.map((hobby, index) => (
                          <li key={index}>{hobby}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
                <div className="interests-interest-box">
                  <label className="shprofile-bio-title">I speak</label>
                  <div className="hobby-box-shprofile">
                    {user.languages && user.languages.length > 0 ? (
                      <ul className="ulshprofile">
                        {user.languages.map((language, index) => (
                          <li key={index}>{language}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowProfile;
