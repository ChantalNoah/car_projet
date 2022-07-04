const express = require('express');
const router = express.Router();
const car= require("../controllers/car.controller.js");
const upload = require('../middleware/imgUpload')


router.post("/create", upload.single('file'), car.create);
router.get("/findAll", car.findAll);
router.get("/findByPk/:carId", car.findByPk);
router.post("/update/:carId", upload.single("file"), car.update);
router.delete("/delete/:carId", car.delete);




module.exports = router;



    