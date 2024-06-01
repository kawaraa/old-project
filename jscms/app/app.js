"use strict";

require("./api/config/load-config")();
const { promisify } = require("util");
const http = require("http");
const express = require("express");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Firewall = require("./api/src/infrastructure/firewall/firewall");
const getApiRouter = require("./api/get-api-router");
const getAdminRouter = require("./admin/get-admin-router");
const getSiteRouter = require("./site/get-site-router");
const mysql = require("mysql");
// const redis = require("redis");
const MysqlDatabaseProvider = require("./api/src/infrastructure/provider/mysql-database-provider");
// const RedisDatabaseProvider = require("./api/src/infrastructure/provider/redis_database_provider");
const CustomError = require("./api/src/domain/model/custom-error");

(async () => {
  try {
    const app = express();
    const server = http.createServer(app);

    // Providers
    const firewall = new Firewall(cookie, jwt);
    const mySqlProvider = new MysqlDatabaseProvider(mysql, promisify);
    // const redisProvider = new RedisDatabaseProvider(redis, promisify);
    // console.log(await redisProvider.get("name"));

    app.use(express.json(), express.urlencoded({ extended: true }), express.static(env.publicDir));

    app.use("/api", getApiRouter(express.Router(), firewall, mySqlProvider, CustomError));
    app.use("/admin", getAdminRouter(express.Router(), firewall, CustomError));
    app.use("/", firewall.checkCountry, getSiteRouter(express.Router(), CustomError));

    app.use("*", (request, response) => response.status(404).end("<h1>Not found</h1>"));

    server.listen(env.PORT, () => console.log("Running on: http://localhost:" + env.PORT));
  } catch (error) {
    console.error("ServerError: ", error);
  }
})();
