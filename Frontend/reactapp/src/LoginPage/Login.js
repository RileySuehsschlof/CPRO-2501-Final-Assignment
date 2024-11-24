import CreateField from "../Components/Field";
import CreateButton from "../Components/Button";
import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [accountCred, setAccountCred] = useState({
    email: "",
    password: "",
  });
  //update state on change
  const handleChange = (event) => {
    const { id, value } = event.target;
    setAccountCred((prevState) => ({
      ...prevState,
      [id.replace("Input", "")]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //send a request to /login with object container email and password to verify user
      const response = await axios.post(
        "http://localhost:8881/login",
        accountCred,
        { headers: { "Content-Type": "application/json" } }
      );
      //response contains token
      const token = response.data.token;
      if (token) {
        // Store the token in session storage, deleted after session
        sessionStorage.setItem("authToken", token);

        setMessage("Login successful!");
        //if there is a locationState go there, otherwise go to default page
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      } else {
        setMessage("Login failed, no token received.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="formContainer">
      <h1>Generic Website Name</h1>
      <form onSubmit={handleSubmit} className="myForm">
        <h2>Login</h2>
        <CreateField
          title="Email"
          placeholderTxt="Email Address"
          id="email"
          value={accountCred.email}
          onChange={handleChange}
        ></CreateField>

        <CreateField
          title="Password"
          id="password"
          placeholderTxt="Password"
          type="password"
          value={accountCred.password}
          onChange={handleChange}
        ></CreateField>

        <CreateButton text="Login" functionName={handleSubmit}></CreateButton>
      </form>
      <a href="/register">
        <p>Create Account</p>
      </a>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
