const express = require('express');
const router = express.Router();
const statut = require("../controllers/statut.controller");


router.post("/create", statut.create);
router.get("/findAll", statut.findAll);
router.get("/findByPk/:statutId", statut.findByPk);
router.post("/update/:statutId", statut.update);
router.delete("/delete/:statutId", statut.delete);
module.exports = router;

