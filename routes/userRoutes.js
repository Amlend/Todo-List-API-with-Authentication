const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userController.postUserRegistration);

router.post("/login", userController.postUserLogin);
