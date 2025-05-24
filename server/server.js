import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import File from "../models/db.js"; 
import pdfParser from "pdf-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/uploads");
mongoose.connection.once("open", () => {
});


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


app.get("/extract/:id", async (req, res) => {
  const fileId = req.params.id;

    // Step 1: Fetch file from MongoDB
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    pdfParser.pdf2json(file.data, function (error, pdf) {
    if(error != null){
        console.log(error);
    }else{
      res.json(pdf);
        console.log(JSON.stringify(pdf));
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
