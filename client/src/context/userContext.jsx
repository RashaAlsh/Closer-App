import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useUser } from "../hooks/useUser";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, loading, userError, fetchUserError, setUser, setRefreshUser } =
    useUser();

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userError,
        fetchUserError,
        setUser,
        setRefreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
