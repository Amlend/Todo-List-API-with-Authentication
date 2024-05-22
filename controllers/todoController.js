const express = require("express");

const { Todo } = require("../models/todo");

exports.getTodo = async (req, res) => {
  try {
    const { page = 1, limit = 10, title, dueDate } = req.query;
    const query = { user: req.user._id };

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive title search
    }

    if (dueDate) {
      query.dueDate = { $gte: new Date(dueDate) }; // Filter todos with due dates greater than or equal to the provided date
    }

    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ dueDate: 1 }); // Sort by due date in ascending order

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

exports.putTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, dueDate },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
