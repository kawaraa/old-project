const WebSocket = require("ws");
const nodemailer = require("nodemailer");
const uuid = require("uuid/v4");
const AccountRepository = require("./infrastructure/repository/account_repository");

const AuthResolver = require("./infrastructure/resolver/auth_resolver");
const UserResolver = require("./infrastructure/resolver/user-resolver");
const MailHandler = require("./application/handler/mail-handler");

module.exports = (server, router, firewall, mySqlProvider, config) => {
  // Repositories
  const accountRepository = new AccountRepository(mySqlProvider, config.accountRepository);

  // Handlers
  const mailHandler = new MailHandler(nodemailer, { mailer: config.nodemailer });

  // Resolvers
  const authResolver = new AuthResolver(
    router,
    firewall,
    accountRepository,
    mailHandler,
    config.authResolver
  );

  const userResolver = new UserResolver(router, firewall, accountRepository);

  authResolver.resolve();
  userResolver.resolve();

  return router;
};
