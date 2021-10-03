const mongoose = require("mongoose");

const UserPicture = mongoose.model(
  "UserPicture",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pictureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
    pictureSize: String,
    pictureCount: Number
  }, { timestamps: true })
);

module.exports = UserPicture;
