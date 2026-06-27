const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// Home
router.get("/", (req, res) => {
    res.send("Student Routes Working");
});

// Add Student
router.post("/add", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View All Students
router.get("/all", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;