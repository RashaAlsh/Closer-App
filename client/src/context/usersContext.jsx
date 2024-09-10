import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useUsers } from "../hooks/useUsers";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const {
    performFetch,
    onReceived,
    setUrl,
    isLoading,
    error: getUsersError,
    filteredUser: users,
  } = useUsers();
  return (
    <UsersContext.Provider
      value={{
        performFetch,
        setUrl,
        onReceived,
        isLoading,
        users,
        getUsersError,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
