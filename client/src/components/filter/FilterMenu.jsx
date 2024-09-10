import React from "react";
import "./FilterMenu.css";

import { MenuList } from "./MenuList";
import { GrClose } from "react-icons/gr";
import PropTypes from "prop-types";

export const FilterMenu = ({
  onClose,
  hobbies,
  locations,
  selectedFilters,
  handleOptionChange,
}) => {
  const filterData = {
    filter: [
      {
        name: "Hobbies",
        options: hobbies.map((hobby) => ({
          value: hobby,
          name: hobby,
        })),
      },
      {
        name: "Locations",
        options: locations.map((location) => ({
          value: location,
          name: location,
        })),
      },
    ],
  };
  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-content" onClick={(e) => e.stopPropagation()}>
        <span className="x-icon" onClick={onClose}>
          <GrClose />
        </span>
        <h2 className="menu-header">Filter Menu </h2>
        {filterData?.filter.map((filterCategory) => (
          <MenuList
            key={filterCategory.name}
            name={filterCategory.name}
            options={filterCategory.options}
            selectedOptions={selectedFilters}
            handleOptionChange={handleOptionChange}
          />
        ))}
        {/*  <button className="menu-button-2" onClick={onClose}>
          Close
        </button> */}
      </div>
    </div>
  );
};

FilterMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  hobbies: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};
