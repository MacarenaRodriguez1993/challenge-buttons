//se inicia express cors morgan
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes/index");
const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use("/button", routes);

module.exports = server;
