import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import recordRoutes from "./routes/recordRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "https://medtrack-seven.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Medical App Backend is running 🚀" });
});

app.listen(PORT, () => {
  console.log("Server running on PORT 5000");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});
