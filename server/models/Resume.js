// models/Resume.js
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
