import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input";
import { PiEyeClosed } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FormContext } from "../../context/formContext";
import Footer from "../footer/Footer";
import { isUserProfileComplete } from "../../util/isUserProfileComplete";
import { useUser } from "../../hooks/useUser";

const SignIn = () => {
  const { isSignIn, setIsSignIn } = useContext(FormContext);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const isFilled = isUserProfileComplete(user);
      if (isFilled) {
        navigate("/");
      } else {
        navigate("/create-profile");
      }
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onReceived = (data) => {
    localStorage.setItem("token", data.token);
    setIsSignIn(true);
    localStorage.setItem("isSignIn", "true");
  };

  const {
    isLoading,
    error: fetchError,
    performFetch,
    cancelFetch,
  } = useFetch("/user/sign-in", onReceived);

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const handleInputChange = (target) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Invalid email or password.");
      return;
    }

    setError("");

    performFetch({
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="sign-in-form">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <PiEyeClosed />}
              </span>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
          {fetchError && <div className="error">{fetchError.toString()}</div>}
          {isLoading && <div className="loading">Loading...</div>}
          <button
            className="dark-pink-button"
            type="submit"
            disabled={isLoading}
            style={{ pointerEvents: isSignIn ? "none" : "auto" }}
          >
            Sign In
          </button>
        </form>
        <div className="signup-link">
          <p> Do not have an account? </p>
          <span className="sign-up-text" onClick={() => navigate("/sign-up")}>
            Sign up
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
