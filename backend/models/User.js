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
    }
  },
  { timestamps: true },
);

userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
