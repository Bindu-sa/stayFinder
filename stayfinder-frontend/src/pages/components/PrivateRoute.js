import React from "react";
import { Navigate } from "react-router-dom";

// Check for token in localStorage (assuming you're storing JWT there)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
