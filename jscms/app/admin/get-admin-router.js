"use strict";
const fs = require("fs");
const path = require("path");
const errorMessage = require("./layout/error.html");
const indexHtml = require("./layout/index.html");

const pages = [];
module.exports = (router, firewall, CustomError) => {
  const pagesDir = path.join(__dirname + "/page/");
  const dirNames = fs.readdirSync(pagesDir);

  dirNames.forEach((htmlFile) => {
    if (fs.statSync(pagesDir + htmlFile).isDirectory()) return;
    const page = {};
    page.path = /dashboard/gim.test(htmlFile) ? "/" : "/" + htmlFile.replace(".html", "");
    page.render = require(pagesDir + htmlFile);
    pages.push(page);
  });

  pages.forEach((page) => {
    router.get(page.path, async (request, response) => {
      try {
        if (page.path === "/login") {
          if (firewall.isAuthenticated(request)) return response.redirect("/admin/");
          return response.send(indexHtml(page.render()));
        } else if (!firewall.isAuthenticated(request)) return response.redirect("/admin/login");
        response.send(indexHtml(page.render(), request.user));
      } catch (error) {
        console.log(error);
        response.status(500).end(indexHtml(errorMessage(CustomError.validate(error).message)));
      }
    });
  });

  return router;
};
