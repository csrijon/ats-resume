import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import File from "../models/db.js"; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/uploads");
mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");
});

// Multer setup to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/",(req,res) => {
  res.send("hello word")
})

app.post("/uploads", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const file = new File({
    filename: req.file.originalname,
    contentType: req.file.mimetype,
    data: req.file.buffer,
  });

  try {
    await file.save();
    res.json({ message: "✅ File upload done" });
  } catch (err) {
    console.error("❌ Error saving file:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
