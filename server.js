import express from "express";
import mongoose from "mongoose";
import path from "path";
import Student from "./models/Student.js";

const app = express();

/* ========================
   MIDDLEWARE
======================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

/* ========================
   DATABASE CONNECTION
======================== */
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ========================
   HOME PAGE
======================== */
app.get("/", (req, res) => {
    res.render("index");
});

/* ========================
   ADD STUDENT PAGE
======================== */
app.get("/addStudent", (req, res) => {
    res.render("addStudent");
});

/* ========================
   CREATE STUDENT (FIXED)
======================== */
app.post("/addStudent", async (req, res) => {

    const { name, rollNo, course, projectName, completionTime } = req.body;

    await Student.create({
        name,
        rollNo,
        course,
        projectName,
        completionTime
    });

    res.redirect("/students");
});

/* ========================
   SHOW ALL STUDENTS
======================== */
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.render("students", { students });
});

/* ========================
   EDIT PAGE
======================== */
app.get("/editStudent/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render("editStudent", { student });
});

/* ========================
   UPDATE STUDENT
======================== */
app.post("/editStudent/:id", async (req, res) => {

    const { name, rollNo, course, projectName, completionTime } = req.body;

    await Student.findByIdAndUpdate(req.params.id, {
        name,
        rollNo,
        course,
        projectName,
        completionTime
    });

    res.redirect("/students");
});

/* ========================
   DELETE STUDENT
======================== */
app.get("/deleteStudent/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/students");
});

/* ========================
   START SERVER
======================== */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});