const db = {
  board: {
    id: "board1",
    name: "My Board",
    lists: [
      { id: "1", name: "To Do", tasks: [] },
      { id: "2", name: "In Progress", tasks: [] },
      { id: "3", name: "Done", tasks: [] }
    ]
  }
};

module.exports = { db };
