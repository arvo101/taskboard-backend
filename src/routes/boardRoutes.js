const express = require("express");
const router = express.Router();
const { db } = require("../storage/db");

// GET /board
router.get("/", (req, res) => {
  res.json(db.board);
});

module.exports = router;
