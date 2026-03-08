const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
    status: {
      type: String,
      enum: ["INVITED", "ACTIVE", "BLOCKED"],
      default: "INVITED"
    },
    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"],
      default: "LOCAL",
    },
  },
  { timestamps: true },
);

userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
