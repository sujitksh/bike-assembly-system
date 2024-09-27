const mongoose = require("mongoose");
const connectDB = async()=>{
    try { 
      await mongoose.connect(`mongodb+srv://users:sujit123@cluster0.h4oto.mongodb.net/bike_assembly`);
      console.log("MongoDB connect successfuly!!");
    } catch (error) {
        console.log("MongoDB not connecting",error)
        process.exit(1);
    }
  }

  module.exports = connectDB;