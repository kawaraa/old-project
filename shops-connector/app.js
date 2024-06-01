"use strict";
require("./config/get-config")();
require("events").EventEmitter.defaultMaxListeners = 100;
const http = require("http");
const express = require("express");
const getApiRouter = require("./src/index");

(async () => {
  try {
    // Add custom functions
    Array.prototype.render = function (cb) {
      return this.reduce((acc, item, i) => acc + cb(item, i), "");
    };

    const app = express();
    const server = http.createServer(app);

    app.disable("x-powered-by");
    app.set("trust proxy", true);
    app.use(express.json({ limit: "50mb", extended: true }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use(express.static(__dirname + "/public"));
    app.use("/api", await getApiRouter(express.Router()));
    app.use("/logout", (req, res) => res.clearCookie("userToken") + res.redirect("/"));

    app.get("*", (request, response) => response.sendFile(__dirname + "/public/index.html"));

    app.use("*", (request, response) => response.status(404).json({ error: "Not Found(!)" }));

    const log = `Running on: http://localhost:${env.port} in a ${process.env.NODE_ENV || "dev"} environment.`;
    server.listen(env.port, () => console.log(log));
  } catch (error) {
    console.error("ServerError: ", error);
  }
})();
