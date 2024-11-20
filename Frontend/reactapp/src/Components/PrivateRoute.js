import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const token = sessionStorage.getItem("authToken");
  const location = useLocation(); // Get the current location

  // If no token is found, redirect to login and save the current location in state
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
