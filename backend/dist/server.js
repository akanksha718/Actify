"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const analyze_1 = __importDefault(require("./routes/analyze"));
const express_2 = require("@clerk/express");
const user_1 = __importDefault(require("./routes/user"));
const reports_1 = __importDefault(require("./routes/reports"));
const Chat_1 = __importDefault(require("./routes/Chat"));
const report_submit_1 = __importDefault(require("./routes/report-submit"));
const stats_1 = __importDefault(require("./routes/stats"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const verification_1 = __importDefault(require("./routes/verification"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, express_2.clerkMiddleware)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL ||
        "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });
app.use("/api/analyze", analyze_1.default);
app.use("/api/users", user_1.default);
app.use("/api/reports", reports_1.default);
app.use("/api/chat", Chat_1.default);
app.use("/api/submit", report_submit_1.default);
app.use("/api/stats", stats_1.default);
app.use("/api/leaderboard", leaderboard_1.default);
app.use("/api/verification", verification_1.default);
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
