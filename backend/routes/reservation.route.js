const express = require('express');
const router = express.Router();
const reservation = require("../controllers/reservation.controller");
router.post("/create", reservation.create);
router.get("/findAll", reservation.findAll);
router.get("/findByPk/:reservationId", reservation.findByPk);
router.post("/update/:reservationId", reservation.update);
router.delete("/delete/:reservationId", reservation.delete);
module.exports = router;