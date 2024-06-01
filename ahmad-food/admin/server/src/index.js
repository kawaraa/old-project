// const nodemailer = require("nodemailer");
const uuid = require("uuid/v4");
const UserRepository = require("./infrastructure/repository/user-repository");
const ProductRepository = require("./infrastructure/repository/product-repository");
const InvoiceRepository = require("./infrastructure/repository/invoice-repository");

const AuthResolver = require("./infrastructure/resolver/auth-resolver");
const EmployeeResolver = require("./infrastructure/resolver/employee-resolver");
const ClientResolver = require("./infrastructure/resolver/client-resolver");
const ProductResolver = require("./infrastructure/resolver/product-resolver");
const InvoiceResolver = require("./infrastructure/resolver/invoice-resolver");

module.exports = (router, firewall, mySqlProvider, config) => {
  // Repositories
  const userRepository = new UserRepository(mySqlProvider, config.accountRepository);
  const productRepository = new ProductRepository(mySqlProvider, config.accountRepository);
  const invoiceRepository = new InvoiceRepository(mySqlProvider, config.accountRepository);

  // Handlers
  // const mailHandler = new MailHandler(nodemailer, config.nodemailer);

  // Resolvers
  const authResolver = new AuthResolver(router, firewall, userRepository, config.authResolver);
  const employeeResolver = new EmployeeResolver(router, firewall, userRepository, config.employeeResolver);
  const clientResolver = new ClientResolver(router, firewall, userRepository, config.clientResolver);
  const productResolver = new ProductResolver(router, firewall, productRepository, config.productResolver);
  const invoiceResolver = new InvoiceResolver(router, firewall, invoiceRepository, config.invoiceResolver);

  authResolver.resolve();
  employeeResolver.resolve();
  clientResolver.resolve();
  productResolver.resolve();
  invoiceResolver.resolve();

  return router;
};
