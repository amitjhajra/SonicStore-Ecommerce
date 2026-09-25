import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// This defines what a "User" looks like in the database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true, // no two users can have the same email
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// --- PASSWORD HASHING (bcrypt) ---
// This runs automatically right BEFORE a user is saved to the database.
// It takes the plain text password and turns it into a hashed (scrambled) version.
// We never store plain text passwords in the database.
userSchema.pre("save", async function (next) {
  // only hash the password if it was changed (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10); // "salt" makes the hash more secure
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- PASSWORD CHECK METHOD ---
// This is a custom method we can call on any user document, like:
// user.matchPassword("typedPassword")
// It compares the typed password with the hashed one stored in the DB.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
