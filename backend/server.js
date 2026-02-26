const express = require("express");
const app = express();
const cors = require("cors");
const env = require("./config/env");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(express.json());

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(env.port, () => {
  console.log(`server is running on http://localhost:${env.port}`);
});
