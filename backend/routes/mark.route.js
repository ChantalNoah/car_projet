
const express = require('express');
const router = express.Router();
const mark = require("../controllers/mark.controller.js");

router.post("/create", mark.create);
router.get("/findAll", mark.findAll);
router.get("/findbypk/:markId", mark.findByPk);
router.post("/update/:markId", mark.update);
router.delete("/delete/:markId", mark.delete);
module.exports = router;
    
