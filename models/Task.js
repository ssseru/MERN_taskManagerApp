const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  iscompleted: {
    type: Boolean,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
