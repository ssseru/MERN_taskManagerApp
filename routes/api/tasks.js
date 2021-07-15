const express = require("express");
const router = express.Router();

const Task = require("../../models/Task");

router.route("/:id").get((req, res) => {
  Task.find({
    userid: req.params.id,
  })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add/:id").post((req, res) => {
  const task = req.body.task;
  const description = req.body.description;
  const userid = req.params.id;
  const date = new Date().toString();
  const iscompleted = false;

  const newTask = new Task({
    task,
    description,
    date,
    iscompleted,
    userid,
  });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Task.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.json("Task deleted"))
    .catch((err) => res.statusCode(400).json("Error: " + err));
});

module.exports = router;
