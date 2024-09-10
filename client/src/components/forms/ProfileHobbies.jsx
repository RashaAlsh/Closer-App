import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { hobbyIcons } from "../hobby/hobbyIcons";
import "./ProfileHobbies.css";

export const ProfileHobbies = ({ options, setValue, defaultValues }) => {
  const [selected, setSelected] = useState(defaultValues || []);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected((prevSelected) => {
      // Toggle selection: add if not selected, remove if selected
      if (prevSelected.includes(option.label)) {
        return prevSelected.filter(
          (selectedOption) => selectedOption !== option.label,
        );
      } else {
        return [...prevSelected, option.label];
      }
    });
  };
  // Update form value whenever selected changes
  useEffect(() => {
    setValue("hobbies", selected);
  }, [selected, setValue]);

  return (
    <div className="custom-dropdown">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {isOpen && selected.length > 0 ? (
          <>
            {selected.map((label) => {
              const hobbyIconData = hobbyIcons.find(
                (item) => item.label === label,
              );
              const IconComponent = hobbyIconData ? hobbyIconData.icon : null;
              return (
                <span key={label}>{IconComponent && <IconComponent />}</span>
              );
            })}
          </>
        ) : (
          <>
            {defaultValues.length > 0 ? (
              defaultValues?.map((label) => {
                const hobbyIconData = hobbyIcons.find(
                  (item) => item.label === label,
                );
                const IconComponent = hobbyIconData ? hobbyIconData.icon : null;
                return (
                  <span key={label}>{IconComponent && <IconComponent />}</span>
                );
              })
            ) : (
              <p>Select three hobbies</p>
            )}
          </>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => {
            const hobbyIconData = hobbyIcons.find(
              (item) => item.label === option.label,
            );
            const IconComponent = hobbyIconData ? hobbyIconData.icon : null;
            const isSelected = selected.includes(option.label);

            return (
              <button
                type="button"
                disabled={selected.length >= 3 && !isSelected}
                key={index}
                className={`dropdown-option ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {IconComponent && <IconComponent />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

ProfileHobbies.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.array,
  setValue: PropTypes.func.isRequired,
  defaultValues: PropTypes.array,
};
