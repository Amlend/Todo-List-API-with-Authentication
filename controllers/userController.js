const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { TodoUser } = require("../models/todoUser");

exports.postUserRegistration = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new TodoUser({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.postUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await TodoUser.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret-key");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
