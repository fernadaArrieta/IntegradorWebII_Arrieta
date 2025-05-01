const express = require("express");
const router = express.Router();
const { getQuestion } = require("../controllers/gameController");

router.get("/question", getQuestion);

module.exports = router;
