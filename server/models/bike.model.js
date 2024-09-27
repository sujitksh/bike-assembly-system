const mongoose = require("mongoose");
const bikeSchema = new mongoose.Schema({
    name: String,
    description:String,
    image:String,
    time: Number
  });
  const Bike = mongoose.model('Bike', bikeSchema);
  module.exports = Bike;