const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const Todo = mongoose.model("Todo", todoSchema);
