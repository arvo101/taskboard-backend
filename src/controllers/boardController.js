const { db } = require("../storage/db");

function getBoard(req, res) {
  res.status(200).json(db.board);
}

module.exports = { getBoard };
