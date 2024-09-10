import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { getToken } from "../config/getToken";
import { useUser } from "../hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [userPathName, setUserPathName] = useState("");
  const { setUser } = useUser();
  //form info
  const [schema, setSchema] = useState();
  const { register, watch, reset, formState, handleSubmit, setValue } = useForm(
    {
      resolver: yupResolver(schema),
    },
  );
  //check profile created
  const [profileCreated, setProfileCreated] = useState(false);
  const signInState = localStorage.getItem("isSignIn");

  const [isSignIn, setIsSignIn] = useState(signInState ? true : false);

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const onReceived = (data) => {
    if (data?.success) {
      setUser(data.user);
    }
  };
  //fetch modal
  const {
    isLoading,
    error: updateUserError,
    performFetch,
    cancelFetch,
  } = useFetch(userPathName, onReceived);

  const onSubmit = (data, method) => {
    const token = getToken();

    performFetch({
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        watch,
        register,
        reset,
        onSubmit,
        handleSubmit,
        isLoading,
        updateUserError,
        setUserPathName,
        setSchema,
        profileCreated,
        setProfileCreated,
        isSignIn,
        setIsSignIn,
        setValue,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
