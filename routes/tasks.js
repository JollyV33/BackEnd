const express = require("express");
const router = express.Router();
// IMPORTANT: Matches the export in database.js
const { tasks: db } = require("../database"); 

// 1. GET ALL TASKS
router.get("/", (req, res) => {
  db.find({}).sort({ createdAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(docs);
  });
});

// 2. POST A NEW TASK
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = {
    title: title.trim(),
    completed: false,
    createdAt: new Date()
  };

  db.insert(newTask, (err, savedTask) => {
    if (err) {
      console.error("NeDB Insert Error:", err);
      return res.status(500).json({ error: "Could not save to database" });
    }
    res.status(201).json(savedTask); 
  });
});

// 3. UPDATE TASK (Toggle Completion)
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  
  // Use $set to update only the completed status
  db.update(
    { _id: req.params.id }, 
    { $set: { completed } }, 
    { returnUpdatedDocs: true }, 
    (err, numReplaced, updatedDoc) => {
      if (err) return res.status(500).json({ error: "Update failed" });
      if (numReplaced === 0) return res.status(404).json({ error: "Task not found" });
      res.json(updatedDoc); // Send the updated task back
    }
  );
});

// 4. DELETE TASK
router.delete("/:id", (req, res) => {
  // Use _id to match NeDB's unique identifier
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    if (numRemoved === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully", id: req.params.id });
  });
});

module.exports = router;