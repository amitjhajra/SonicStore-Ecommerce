import jwt from "jsonwebtoken";
import User from "../models/User.js";

// This middleware "protects" routes that require login.
// It checks the request for a valid JWT token before allowing it through.
const protect = async (req, res, next) => {
  let token;

  // We expect the token in the header like: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the logged-in user to the request (without the password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // token is valid, continue to the actual route
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
