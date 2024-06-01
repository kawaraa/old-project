"use strict";

const getConfig = require("./server/config/get-config");
const { promisify } = require("util");
const http = require("http");
const express = require("express");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const gCloud = require("@google-cloud/storage");
const MysqlDatabaseProvider = require("./server/src/infrastructure/provider/mysql_database_provider");
const Firewall = require("./server/src/infrastructure/firewall/firewall");
const GCloudStorageProvider = require("./server/src/infrastructure/provider/gcloud-storage-provider");
const MysqlDatabaseBackupCron = require("./server/src/infrastructure/factory/mysql-database-backup-cron");
const getApiRouter = require("./server/src/index.js");

(async () => {
  try {
    const config = getConfig();
    const app = express();
    const server = http.createServer(app);

    // Providers
    const mySqlProvider = new MysqlDatabaseProvider(mysql, promisify, config.mysql);
    // const storageProvider = new GCloudStorageProvider(gCloud, promisify, config.gCloud);
    const firewall = new Firewall(cookie, jwt, config.firewall);

    const apiRouter = getApiRouter(express.Router(), firewall, mySqlProvider, config);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(config.publicDir));
    app.use("/api", apiRouter);

    app.get("*", (request, response) => response.sendFile(config.publicDir + "/index.html"));

    app.use("*", (request, response) => response.status(404).end("Not Found page"));

    server.listen(config.port, () => console.log("Running on: http://localhost:" + config.port));

    // new MysqlDatabaseBackupCron(storageProvider, config.mysqlDatabaseBackupCron).schedule();
  } catch (error) {
    console.error("ServerError: ", error);
  }
})();
