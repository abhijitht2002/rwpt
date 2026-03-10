const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./config/env");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const oauthRoutes = require("./routes/oauth.routes")
const adminRoutes = require("./routes/admin.routes");
const tasksRoutes = require("./routes/tasks.routes");
const managerRoutes = require("./routes/manager.routes")
const profileRoutes = require("./routes/profile.routes")
const passport = require('./config/passport');

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize())

connectDB();

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", oauthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/manager", managerRoutes);

app.listen(env.port, () => {
  console.log(`server is running on http://localhost:${env.port}`);
});
