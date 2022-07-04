const express = require('express');
const router = express.Router();
const carmodel= require("../controllers/carmodel.controller.js");
router.post("/create", carmodel.create);
router.get("/findAll", carmodel.findAll);
router.get("/findbypk/:carmodelId", carmodel.findByPk);
router.post("/update/:carmodelId", carmodel.update);
router.delete("/delete/:carmodelId", carmodel.delete);
module.exports = router;
    
    
