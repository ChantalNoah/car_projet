const express = require('express');
const router = express.Router();
const email= require("../controllers/email.controller.js");


//auth routes
router.get('/email', email.signIn);


//user routes



module.exports = router;
    
