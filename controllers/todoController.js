const express = require("express");

const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const todo = new Todo({ title, description, dueDate, user: req.user._id });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
