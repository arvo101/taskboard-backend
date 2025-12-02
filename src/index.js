const express = require("express");

const app = express();
const boardRoutes = require("./routes/boardRoutes");
const listRoutes = require("./routes/listRoutes");

const PORT = 3000;

app.use(express.json());
app.use("/board", boardRoutes);
app.use("/", listRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Taskboard API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
