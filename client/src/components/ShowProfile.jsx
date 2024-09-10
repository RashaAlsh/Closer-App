import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/formContext";
import { FormItem } from "./forms/FormItem";
import "./forms/UpdateProfileForm.css";
import { useFields } from "../hooks/useFields";
import { useDefaultValues } from "../hooks/useDefaultValues";
import { useSchema } from "../hooks/useSchema";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const ShowProfile = () => {
  const { reset, watch, formState, setSchema, register } =
    useContext(FormContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [fields, setFields] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const onReceived = (data) => {
    const user = data?.user;
    if (data?.success) {
      setUser(user);
    }
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${id}`,
    onReceived,
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      const fields = useFields();
      const schema = useSchema();
      setSchema(schema["user"]);
      setFields(fields["user"]);
      const defaultValues =
        user.length > 0 ? useDefaultValues(user, fields["user"]) : {};

      defaultValues.location =
        typeof user?.location === "object" && user?.location.length > 0
          ? user.location[0].city
          : user?.location || "";

      reset(defaultValues);
    }
  }, [user]);

  const data = formState?.defaultValues;
  if (!data) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>No user we found. You can sign in or sign up</p>;
  }
  function handleChatClick() {
    navigate(`/chat/${id}`);
  }

  return (
    <div className="Profile-form">
      {isLoading && <div>Loading...</div>}

      <header className="show-profile-header">
        <h1>{user?.firstName}</h1>
        <button className="chat-button" onClick={handleChatClick}>
          Chat
        </button>
      </header>
      <form>
        {Object.values(fields || {})?.map((field, index) => (
          <FormItem
            key={index}
            field={field}
            watch={watch}
            isEdit={false}
            register={register}
            defaultValue={formState.defaultValues[field.name] || ""}
          />
        ))}
        <div>{error && <div className="error">{error.toString()}</div>}</div>
      </form>
    </div>
  );
};
