"use strict";

const getConfig = require("./server/config/get-config");
const { promisify } = require("util");
const http = require("http");
const express = require("express");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const MysqlDatabaseProvider = require("./server/src/infrastructure/provider/mysql_database_provider");
const Firewall = require("./server/src/infrastructure/firewall/firewall");
const getApiRouter = require("./server/src/index.js");
const getWebRouter = require("./frontend/ssr/index.js");

(async () => {
  try {
    const config = getConfig();
    const app = express();
    const server = http.createServer(app);

    // Providers
    const mySqlProvider = new MysqlDatabaseProvider(mysql, promisify, config.mysql);
    const firewall = new Firewall(cookie, jwt, config.firewall);

    const apiRouter = getApiRouter(server, express.Router(), firewall, mySqlProvider, config);

    const webRouter = getWebRouter(express.Router(), firewall, mySqlProvider, config);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(config.publicDir));
    app.use("/api", apiRouter);
    app.use("*", webRouter);

    app.use("*", (request, response) => response.status(404).end("Not Found page"));

    server.listen(config.port, () => console.log("Running on: http://localhost:" + config.port));
  } catch (error) {
    console.error("ServerError: ", error);
  }
})();
