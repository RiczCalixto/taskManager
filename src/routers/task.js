const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    return res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) {
      res.status(400).send();
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Error, invalid update!" });
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
