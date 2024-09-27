const Employee = require("../models/employee.model.js");
const Bike = require("../models/bike.model.js");
const Assembly = require("../models/assembly.model.js");

const getBike = async (req, res) => {
    try {
        result = await Bike.find();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
const loginEmployee = async(req,res)=>{
    const { username,password } = req.body;
    
    try {
        const userExits = await Employee.findOne({username});
      
        if(!userExits){
            return res.status(400).json({msg:"Invalid Credential"})
        }else{
            // const response = await bcrypt.compare(password,userExits.password);
            const response = userExits.password == password?userExits.password:"";
           
            if(!response){
                return res.status(401).json({msg:"Invalid username or password"})
            }else{
                const token = await userExits.genrateToken();
                return res.status(200).json({msg:"login successfull",token,username:userExits.username,role:userExits.role,empId:userExits._id})
            }
        }
    } catch (error) {
        return res.json({msg:"Internal server error"})
    }
}


const assembly= async (req, res) => {
    const assembly = new Assembly(req.body);
    await assembly.save();
    return res.status(201).json({msg:"assemble successull",assembly});
  }

  const dashboard = async (req, res) => {
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const assemblies = await Assembly.find({
        date: { $gte: fromDate, $lte: toDate }
      }).populate("employeeId");

      const totalBikesAssembled = assemblies.length;
      const employeeProduction = assemblies.reduce((acc, assembly) => {
        acc[assembly.employeeId.username] = (acc[assembly.employeeId.username] || 0) + 1;
        return acc;
      }, {});
    
      return res.status(200).json({ totalBikesAssembled, employeeProduction });
  }
module.exports = { getBike,loginEmployee,assembly,dashboard }