import React from "react";
import Prototypes from "prop-types";
import { hobbyIcons } from "../hobby/hobbyIcons";
import "../hobby/HobbyButtons.css";

export const UserHobbies = ({ hobbies }) => {
  return (
    <div className="hobby-wrapper">
      {hobbies.map((hobby, index) => {
        const hobbyIconData = hobbyIcons.find((item) => item.label === hobby);
        const IconComponent = hobbyIconData ? hobbyIconData.icon : null;

        return (
          <div key={index} className="icon">
            {IconComponent ? <IconComponent /> : null}
          </div>
        );
      })}
    </div>
  );
};

UserHobbies.propTypes = {
  hobbies: Prototypes.array,
};
