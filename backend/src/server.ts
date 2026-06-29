import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoute from "./routes/analyze";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user";
import reportRoutes from "./routes/reports";
import chatRoutes from "./routes/Chat";
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
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

app.use("/api/analyze", analyzeRoute);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/chat", chatRoutes);
app.listen(8000, () => {
  console.log(
    "Server running on port 8000"
  );
});