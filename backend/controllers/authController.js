import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Signup request:", req.body);

    if (!username || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Email already exists:", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    console.log("User created:", user);

    const token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Sending response...");
    return res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please provide email and password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.json({ message: "Logout Successfully" });
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
