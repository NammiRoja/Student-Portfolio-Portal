import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    course: String,
    projectName:String,
    completionTime:String
});

export default mongoose.model("Student", studentSchema);