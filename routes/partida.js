const express = require("express");
const router = express.Router();
const { guardarPartida } = require("../controllers/partidaController");

router.post("/partida", guardarPartida);

module.exports = router;
