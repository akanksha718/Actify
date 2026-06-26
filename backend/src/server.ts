import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoute from "./routes/analyze";


dotenv.config();

const app = express();

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