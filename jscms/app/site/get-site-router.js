"use strict";
const fs = require("fs");
const path = require("path");
const errorMessage = require("./error.html");
const IndexHtml = require("./get-index-html");

module.exports = (router, CustomError) => {
  const indexHtml = new IndexHtml("Function that get the data from database and turn it into html");

  router.get("*", async (request, response) => {
    try {
      const str = path.join(__dirname + "/page" + request.url);
      const filePath = str.charAt(str.length - 1) !== "/" ? str : str.slice(0, str.length - 1);

      if (!fs.existsSync(filePath + ".html")) response.status(404).end("<h1>Not found</h1>");
      else response.send(indexHtml.render(fs.readFileSync(filePath + ".html", "utf8")));
    } catch (error) {
      response.status(500).end(indexHtml.render(errorMessage(CustomError.validate(error).message)));
    }
  });

  return router;
};
