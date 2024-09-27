const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bike_selection:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        default:null
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})


employeeSchema.methods.genrateToken = async function(){
     const userDetails={
        id:this._id.toString(),
        username:this.username,
        role:this.role
     }
     try {
        return jwt.sign(userDetails,process.env.JWT_SECRET_TOKEN,{expiresIn:"1d"});
     } catch (error) {
        console.log(error)
     }
     
}
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;