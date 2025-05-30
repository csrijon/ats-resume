import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import File from "../server/models/db.js"; // file schema/model
import Resume from "../server/models/Resume.js"; // new Resume model for storing text
import analyze from "../server/routes/analyze.js";
import improve from "../server/routes/improve.js"
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";


const { getDocument, GlobalWorkerOptions } = pdfjsLib;
// GlobalWorkerOptions.workerSrc = pdfjsWorker;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/analyze-resume", analyze);
app.use("/improve-resume", improve)

mongoose.connect("mongodb://127.0.0.1:27017/uploads");
mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/uploads", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    // Save the raw PDF file first
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    const savedFile = await newFile.save();

    // Extract text from PDF buffer
    const data = new Uint8Array(req.file.buffer);
    const pdf = await getDocument(data).promise;
    let textContent = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      textContent += strings.join(" ") + "\n";
    }

    // Save extracted text separately in Resume collection with ref to file ID
    const newResume = new Resume({
      text: textContent,
      fileId: savedFile._id,  // optional, to link back to file
    });
    const savedResume = await newResume.save();

    console.log("File saved with ID:", savedFile._id);
    console.log("Extracted text saved in Resume with ID:", savedResume._id);

    // Respond with both IDs
    res.json({ 
      message: "File uploaded and text extracted",
      fileId: savedFile._id,
      resumeId: savedResume._id,
    });
  } catch (error) {
    console.error("Upload and extraction error:", error);
    res.status(500).json({ error: "Failed to save file or extract text" });
  }
});
app.get("/extract/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: "File not found" });

    const data = new Uint8Array(file.data);
    
    // Disable worker here to avoid the workerSrc error
    const pdf = await getDocument({ data, disableWorker: true }).promise;

    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      textContent += strings.join(" ") + "\n";
    }

    res.json({ text: textContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to extract text from PDF" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
