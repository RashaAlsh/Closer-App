import React, { useContext } from "react";
import TEST_ID from "./Home.testid";
import UserList from "../user-list/UserList";
import Map from "../../components/Map";
import { FormContext } from "../../context/formContext";
import AboutUs from "../AboutUs/AboutUs";
import "./Home.css";
import { FilterForm } from "../../components/filter/FilterForm";

const Home = () => {
  const { isSignIn } = useContext(FormContext);
  return (
    <div data-testid={TEST_ID.container}>
      {isSignIn ? (
        <div className="container">
          <div className="map-container">
            <Map />
          </div>
          <div className="user-list-container3">
            <UserList />
          </div>
          <FilterForm className="works" />
        </div>
      ) : (
        <AboutUs />
      )}
    </div>
  );
};

export default Home;
