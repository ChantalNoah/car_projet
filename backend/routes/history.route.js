const express = require('express');
const router = express.Router();
const history= require("../controllers/history.controller.js");
const auth = require('../auth/auth')

router.get("/findAll", history.findAll);
router.get("/findByPk/:historyId",history.findOne);
module.exports = router;