const express = require("express");
const router = express.Router();

const { getBoard } = require("../controllers/boardController");

router.get("/", getBoard);

module.exports = router;
