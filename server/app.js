require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./db/connection.js")
const {router:employeeRouter} = require("./routes/employee.route.js");

const app = express();
const port = process.env.PORT || 8000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api",employeeRouter);
app.use(express.static("public"));

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Running on ${port}`)
    })
})
.catch((err)=>{
    console.log(`Database connection failed`,err)
})