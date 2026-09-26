import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // Only allow access if user exists AND is an admin
  return user && user.isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;