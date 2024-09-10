import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export const useUsers = () => {
  const [url, setUrl] = useState("/user");
  const [filteredUser, setFilteredUser] = useState();

  const onReceived = (data) => {
    setFilteredUser(data.users);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    url,
    onReceived,
  );

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [url]);

  return { isLoading, error, filteredUser, performFetch, setUrl };
};
