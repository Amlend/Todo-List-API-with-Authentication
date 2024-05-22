const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/auth");
const todoController = require("../controllers/todoController");

router.get("/todos", userAuthentication.authentication, todoController.getTodo);

router.post(
  "/todos",
  userAuthentication.authentication,
  todoController.postTodo
);

router.put(
  "todos/:id",
  userAuthentication.authentication,
  todoController.putTodo
);

router.delete(
  "todos/:id",
  userAuthentication.authentication,
  todoController.deleteTodo
);

module.exports = router;
