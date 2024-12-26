import express from "express";
import bodyParser from "body-parser";
import discountRoutes from "./routes/discountRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection falied:", err));
app.use("/api/discounts", discountRoutes);
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
