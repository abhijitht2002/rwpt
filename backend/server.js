const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./config/env");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const tasksRoutes = require("./routes/tasks.routes");

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

connectDB();

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(env.port, () => {
  console.log(`server is running on http://localhost:${env.port}`);
});
