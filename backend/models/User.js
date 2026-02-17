const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
  },
  { timestamp: true },
);

userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
