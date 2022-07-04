const express = require('express');
const router = express.Router();
const user= require("../controllers/user.controller.js");
const auth= require("../controllers/auth.controller.js");
const nodemailer =require("nodemailer");

//auth routes

router.post('/login', auth.signIn);

//user routes
router.post("/create", user.create);
router.get("/findAll", user.findAll);
router.get("/findByPk/:userId", user.findByPk);
router.post("/update/:userId", user.update);
router.delete("/delete/:userId", user.delete);
router.get("/generate/:email", user.sendEmail);
//router.get("/generate/:notification", user.sendnotification);
router.get("/count", user.count);
router.get("/findAllrole/:userrole", user.findAllrole);




module.exports = router;
    
