const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/auth");
const todoController = require("../controllers/todoController");

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *         description: The page number (defaults to 1)
 *       - name: limit
 *         in: query
 *         type: integer
 *         description: The number of Todos per page (defaults to 10)
 *       - name: title
 *         in: query
 *         type: string
 *         description: Filter Todos by title (case-insensitive search)
 *       - name: dueDate
 *         in: query
 *         type: string
 *         description: Filter Todos with due dates greater than or equal to the provided date (format should be specified in the description)
 *     responses:
 *       '200':
 *         description: List of Todos for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the Todo
 *                   title:
 *                     type: string
 *                     description: The title of the Todo
 *                   description:
 *                     type: string
 *                     description: The description of the Todo
 *                   dueDate:
 *                     type: string
 *                     description: The due date of the Todo
 *       '400':
 *         description: Bad request (e.g., invalid query parameters)
 *       '500':
 *         description: Internal server error
 */
router.get("/todos", userAuthentication.authentication, todoController.getTodo);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new Todo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the new Todo
 *               description:
 *                 type: string
 *                 description: The description of the new Todo
 *               dueDate:
 *                 type: string
 *                 description: The due date of the new Todo (format should be specified in the description)
 *     responses:
 *       '201':
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created Todo
 *                 title:
 *                   type: string
 *                   description: The title of the new Todo
 *                 description:
 *                   type: string
 *                   description: The description of the new Todo
 *                 dueDate:
 *                   type: string
 *                   description: The due date of the new Todo
 *       '400':
 *         description: Bad request (e.g., invalid data in request body)
 */
router.post(
  "/todos",
  userAuthentication.authentication,
  todoController.postTodo
);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a Todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the Todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the Todo
 *               description:
 *                 type: string
 *                 description: The updated description of the Todo
 *               dueDate:
 *                 type: string
 *                 description: The updated due date of the Todo (format should be specified in the description)
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated Todo
 *                 title:
 *                   type: string
 *                   description: The updated title of the Todo
 *                 description:
 *                   type: string
 *                   description: The updated description of the Todo
 *                 dueDate:
 *                   type: string
 *                   description: The updated due date of the Todo
 *       '400':
 *         description: Bad request (e.g., invalid data in request body)
 *       '404':
 *         description: Todo not found
 */
router.put(
  "/todos/:id",
  userAuthentication.authentication,
  todoController.putTodo
);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the Todo to delete
 *     responses:
 *       '200':
 *         description: Todo deleted successfully
 *       '400':
 *         description: Bad request (e.g., invalid data in request body)
 *       '404':
 *         description: Todo not found
 */
router.delete(
  "/todos/:id",
  userAuthentication.authentication,
  todoController.deleteTodo
);

module.exports = router;
