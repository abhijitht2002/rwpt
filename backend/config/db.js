const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("connection successful");
  } catch (err) {
    console.log("failed to connect", err);
  }
};

module.exports = connectDB;
