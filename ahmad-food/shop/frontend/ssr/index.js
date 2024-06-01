const CustomError = require("../../server/src/domain/model/custom-error");
const indexHtml = require("./view/index.html");
const errorMessage = require("./view/layout/error.html");
const navbar = require("./view/layout/navbar.html");

module.exports = (router, firewall, MysqlDatabaseProvider, config) => {
  // Repositories

  // Handlers

  // Resolvers
  router.get("/", async (request, response) => {
    try {
      response.send(indexHtml("Content", navbar(false)));
    } catch (error) {
      response.status(500).end(indexHtml(errorMessage(CustomError.validate(error).message), navbar(false)));
    }
  });

  // app.get("/posts/:id", ServeLoggedInUserWithReact, (request, response) => {
  //   response.redirect("/web" + request.url.replace("posts", "post"));
  // });

  return router;
};
