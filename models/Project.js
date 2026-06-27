app.post("/addStudent", async (req, res) => {

    // 🔴 ADD THIS DEBUG LINE HERE
    console.log("RECEIVED DATA:", req.body);

    const { name, rollNo, course, projectName, completionTime } = req.body;

    const newStudent = await Student.create({
        name,
        rollNo,
        course,
        projectName,
        completionTime
    });

    // 🔴 OPTIONAL DEBUG
    console.log("SAVED IN DB:", newStudent);

    res.redirect("/students");
});