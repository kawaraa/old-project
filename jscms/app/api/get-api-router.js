const HtmlFileHandler = require("./src/application/handler/html-file-handler");
const AccountRepository = require("./src/infrastructure/repository/account-repository");
const HtmlRepository = require("./src/infrastructure/repository/html-repository");
const HtmlAttributeRepository = require("./src/infrastructure/repository/html-attribute-repository");
const CssRepository = require("./src/infrastructure/repository/css-repository");
const HtmlCodeRepository = require("./src/infrastructure/repository/html-code-repository");
const AuthResolver = require("./src/infrastructure/resolver/auth-resolver");
const UserResolver = require("./src/infrastructure/resolver/user-resolver");
const HtmlResolver = require("./src/infrastructure/resolver/html-resolver");
const HtmlAttributeResolver = require("./src/infrastructure/resolver/html-attribute-resolver");
const CssResolver = require("./src/infrastructure/resolver/css-resolver");
const HtmlCodeResolver = require("./src/infrastructure/resolver/html-code-resolver");

module.exports = (router, firewall, mySqlProvider, CustomError) => {
  // Handlers
  const htmlFileHandler = new HtmlFileHandler();

  // Repositories
  const accountRepository = new AccountRepository(mySqlProvider);
  const htmlRepository = new HtmlRepository(mySqlProvider);
  const htmlAttributeRepository = new HtmlAttributeRepository(mySqlProvider);
  const cssRepository = new CssRepository(mySqlProvider);
  const htmlCodeRepository = new HtmlCodeRepository(mySqlProvider);

  // resolvers
  const authResolver = new AuthResolver(router, firewall, accountRepository);
  const userResolver = new UserResolver(router, firewall, accountRepository);
  const htmlResolver = new HtmlResolver(router, firewall, htmlRepository, htmlFileHandler);
  const htmlAttributeResolver = new HtmlAttributeResolver(
    router,
    firewall,
    htmlAttributeRepository,
    htmlFileHandler
  );
  const cssResolver = new CssResolver(router, firewall, cssRepository, htmlFileHandler);
  const htmlCodeResolver = new HtmlCodeResolver(router, firewall, htmlCodeRepository, htmlFileHandler);

  authResolver.resolve();
  userResolver.resolve();
  htmlResolver.resolve();
  htmlAttributeResolver.resolve();
  cssResolver.resolve();
  htmlCodeResolver.resolve();

  return router;
};
