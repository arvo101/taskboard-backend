const { db } = require("../storage/db");

function createTask(req, res) {
  const { listId } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required!" });
  }

  const list = db.board.lists.find((listObject) => listObject.id === listId);

  if (!list) {
    return res
      .status(404)
      .json({ error: `List '${listId}' not found!` });
  }

  const newTask = {
    id: `task-${Date.now()}`,
    title,
    description
  };

  list.tasks.push(newTask);

  return res.status(201).json(newTask);
}

module.exports = { createTask };
