const mongoose = require("mongoose");

const Picture = mongoose.model(
  "Picture",
  new mongoose.Schema({
    // id: Number,
    pictureName: String,
    pictureSrcImage: String,
    pictureType: String,
    picturePrice: Number,
    pictureColor: String,
  },
    { timestamps: true }
  )
);

module.exports = Picture;
