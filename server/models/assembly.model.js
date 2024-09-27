const mongoose = require("mongoose");
const assemblySchema = new mongoose.Schema({
    bikeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        default:null
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    date: { type: Date, default: Date.now }
  });
  const Assembly = mongoose.model('Assembly', assemblySchema);
  module.exports = Assembly;