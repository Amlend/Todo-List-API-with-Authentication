const mongoose = require("mongoose");

const todoUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const TodoUser = mongoose.model("TodoUser", todoUserSchema);

module.exports = { TodoUser };
