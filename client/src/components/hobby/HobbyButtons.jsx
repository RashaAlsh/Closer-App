import React, { useState } from "react";
import { hobbyIcons } from "./hobbyIcons";
import "./HobbyButtons.css";

const HobbyButtons = () => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleButtonClick = (index) => {
    if (selectedHobbies.includes(index)) {
      setSelectedHobbies(selectedHobbies.filter((i) => i !== index));
    } else if (selectedHobbies.length < 3) {
      setSelectedHobbies([...selectedHobbies, index]);
    } else {
      setSelectedHobbies([...selectedHobbies.slice(1), index]);
      // setSelectedHobbies([index, ...selectedHobbies.slice(0, 2)]);
    }
  };

  const isSelectionComplete = selectedHobbies.length === 3;

  return (
    <div className="hobby-wrapper1">
      <div className="hobby-wrapper">
        {hobbyIcons.map((hobby, index) => {
          const IconComponent = hobby.icon;
          const isSelected = selectedHobbies.includes(index);

          return (
            <button
              key={index}
              className={`hobby ${isSelected ? "selected" : ""}`}
              onClick={() => handleButtonClick(index)}
            >
              <div className="icon">
                <IconComponent />
              </div>
            </button>
          );
        })}
        {/* <div className="selection-status">
        {isSelectionComplete
          ? "You have selected exactly 3 hobbies."
          : "Please select exactly 3 hobbies."}
      </div> */}
        <button
          className="submit-button"
          onClick={() => {
            if (isSelectionComplete) {
              alert(
                `You have selected: ${selectedHobbies
                  .map((i) => hobbyIcons[i].label)
                  .join(", ")}`,
              );
            }
          }}
          disabled={!isSelectionComplete}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HobbyButtons;
