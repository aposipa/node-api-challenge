const express = require("express");

const server = express();

server.use(express.json());

const actionsRouter = require("./actions/actionsRouter.js");
const projectsRouter = require("./projects/projectsRouter.js");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
    res.send("<h2> Welcome to my sprint challenge project!</h2>");
})

function logger(req, res, next) {
    const { method, originalUrl } = req;
    const date = Date.now();
    timeStamp = date.toString();
    console.log(`${method} to ${originalUrl} @ ${timeStamp}`);
    next();
  }

module.exports = server;