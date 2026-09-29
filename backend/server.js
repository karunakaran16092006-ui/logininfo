import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  dept: String,
  className: String,
  year: String,
  email: String,
});

const Student = mongoose.model("Student", studentSchema);

app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);

    const savedStudent = await student.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save student",
    });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get students",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});