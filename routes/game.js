const express = require("express");
const router = express.Router();
const { getQuestion } = require("../controllers/gameController");

router.get("/", getQuestion);

module.exports = router;
