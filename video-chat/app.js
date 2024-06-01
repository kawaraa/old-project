"use strict";
const config = require("./config.json");
const express = require("express");
const WebSocket = require("ws").Server;
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Firewall = require("./server/utility/firewall");
const SocketResolver = require("./server/resolver/socket-resolver");

const app = express();
const server = require("http").createServer(app);
const webSocket = new WebSocket({ server, path: "/live", clientTracking: true });
const appDirectory = process.cwd();
const PORT = process.env.PORT || 8080;

const firewall = new Firewall(cookie, jwt, config.firewall);
const socketResolver = new SocketResolver(webSocket, firewall, config.cookieOptions);

socketResolver.resolve();
app.set("trust proxy", true);

app.use("/media/girl.jpg", (request, response) => {
  response.sendFile(appDirectory + "/client/media/girl.jpg");
});
app.use("/script/utility.js", (request, response) => {
  response.sendFile(appDirectory + "/client/script/utility.js");
});
app.use("/script/main.js", (request, response) => {
  response.sendFile(appDirectory + "/client/script/main.js");
});
app.use("/bundle.js", (request, response) => {
  response.sendFile(appDirectory + "/client/bundle.js");
});
app.use("/style", (request, response) => {
  response.sendFile(appDirectory + "/client/style/main.css");
});
app.get("*", (request, response) => {
  response.sendFile(appDirectory + "/client/html/index.html");
});

server.listen(PORT, () => console.log("Running on: http://localhost:" + PORT));
