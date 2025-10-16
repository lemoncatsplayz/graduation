import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🪪 Cloudinary configuration
cloudinary.config({
  cloud_name: "dsyefqzi5", // your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🌸 API route to get all uploaded photos
app.get("/photos", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder=graduation OR tags=graduation")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const urls = result.resources.map(r => r.secure_url);
    res.json({ photos: urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
