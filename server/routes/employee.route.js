const express = require('express');
const { authMiddleware } = require('../middleware/authentication.js');
const { fileUpload } = require("../utils/fileUpload.js");
const router = express.Router();
const { signupEmployee,getBike,addBike,loginEmployee,assembly,dashboard } = require("../controllers/employee.controller.js");


router.post("/login",loginEmployee);
router.get("/bikes",authMiddleware,getBike);
router.post("/assemble",authMiddleware,assembly);
router.get("/dashboard",authMiddleware,dashboard);

module.exports = {router}

