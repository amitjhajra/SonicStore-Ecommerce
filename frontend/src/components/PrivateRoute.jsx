import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Wrap any page in this to require login first.
// Example usage in App.jsx:
// <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
