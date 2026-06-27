import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoute from "./routes/analyze";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
app.use(clerkMiddleware());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/analyze", analyzeRoute);

app.listen(8000, () => {
  console.log(
    "Server running on port 8000"
  );
});