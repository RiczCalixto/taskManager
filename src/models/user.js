const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (value.length <= 6) {
        throw new Error("Pw must have 6+ characters");
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error("Please provide another pw");
      }
    }
  }
});

module.exports = User;
