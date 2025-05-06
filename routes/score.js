const express = require("express");
const router = express.Router();
const { saveScore, getTopScores } = require("../controllers/scoreController");

router.post("/scores", saveScore);
router.get("/scores/top", getTopScores);

module.exports = router;
