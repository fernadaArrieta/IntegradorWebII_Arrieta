const express = require("express");
const router = express.Router();
const { obtenerRanking } = require("../controllers/rankingController");

router.get("/ranking", obtenerRanking);

module.exports = router;
