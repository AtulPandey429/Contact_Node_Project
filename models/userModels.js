const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add userName"],
    },
    email: {
      type: String,
      required: [true, "please add useremail"],
      unique: [true, "enter  email"],
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
