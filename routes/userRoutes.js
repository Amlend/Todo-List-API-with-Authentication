const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 */
router.post("/register", userController.postUserRegistration);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authorization
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Internal server error
 */
router.post("/login", userController.postUserLogin);

module.exports = router;
