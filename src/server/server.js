const express = require("express");
const app = express();
const config = require("./server.config");
const { insertToMongo, deleteFromMongo, getFromMongo } = require("./db/mongo");

app.use(express.json());

app.post("/insertDataToMongo", function (req, res) {
  config.getInstance().emit("video-list", { action: "add-new-video", video: req.body });
  insertToMongo(req.body);
});

app.get("/deleteFromMongo", function (req, res) {
  config.getInstance().emit("video-list", { action: "remove-video", video: req.query.id });
  deleteFromMongo(req.query.id);
});

app.get("/getFromMongo", async function (req, res) {
  const resp = await getFromMongo();
  res.statusCode = 200;
  res.json(resp);
});

const server = app.listen(3030);
config.createInstance(server);
