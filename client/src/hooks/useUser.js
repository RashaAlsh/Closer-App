import { useState, useEffect } from "react";
import { logError } from "../util/logging";
import useFetch from "./useFetch";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../config/getToken";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  let token = getToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userError, setUserError] = useState(null);
  const navigate = useNavigate();

  const onReceivedUser = (data) => {
    setUser(data.user);
    setLoading(false);
  };

  const { performFetch: fetchUsers, error: fetchUserError } = useFetch(
    `/user/${userId}`,
    onReceivedUser,
  );

  useEffect(() => {
    const currentToken = getToken();
    if (!currentToken) {
      setUserError("There is no user. You have to sign in or sign up.");
      logError("There is no user. You have to sign in or sign up.");
      setLoading(false);
      navigate("/sign-in");
      return;
    }
    const decodedToken = jwtDecode(token);
    const newUserId = decodedToken.id || decodedToken._id || null;
    setUserId(newUserId);
    if (!newUserId) {
      setUserError("User ID is not available.");
      logError("User ID is not available.");
      setLoading(false);
      return;
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUsers({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [userId]);

  return { user, loading, userError, fetchUserError, setUser };
};
