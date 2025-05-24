import mongoose from "mongoose";
import { Buffer } from "buffer";

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

const File = mongoose.model("File", FileSchema);
export default File;
