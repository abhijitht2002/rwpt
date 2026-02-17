const express = require("express");
const app = express();
const cors = require("cors");
const env = require("./config/env");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/auth", authRoutes);

app.listen(env.port, () => {
  console.log(`server is running on http://localhost:${env.port}`);
});
