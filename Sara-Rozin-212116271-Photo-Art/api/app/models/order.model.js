const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    totalPrice:Number,
    date:Date,
  }, { timestamps: true })
);

module.exports = Order;
