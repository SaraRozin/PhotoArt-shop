const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id:String,
    userPassword: String,
    userEmail: String,
    // role: String,
  },
    { timestamps: true })
);

module.exports = User;
