const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      passwordHash: hashPass,
      role: "EMPLOYEE",
    });

    await newUser.save();
    res.status(200).json({ message: "User registered" });
  } catch (err) {
    console.log("Error register", err);
    res.status(404).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    if (!bcrypt.compare(password, user.passwordHash))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = await jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      env.secretKey,
      { expiresIn: "1h" },
    );

    res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    console.log("Error login", err);
    res.status(404).json({ error: "Login failed" });
  }
};

module.exports = { register, login };
