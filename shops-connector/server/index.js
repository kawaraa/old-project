const { promisify } = require("util");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const mysql = require("mysql2");
const xmlConverter = require("xml-js");
const Logger = require("./infrastructure/logger/logger");
const Hashing = require("./application/service/hashing");
const MySqlDatabaseProvider = require("./infrastructure/provider/mysql-database-provider");
const Firewall = require("./infrastructure/firewall/firewall");
const ShopifyRepository = require("./infrastructure/repository/shopify-repository");
const ErpRepository = require("./infrastructure/repository/erp-repository");
const UserRepository = require("./infrastructure/repository/user-repository");
const ShopRepository = require("./infrastructure/repository/shop-repository");
const OrderRepository = require("./infrastructure/repository/order-repository");
const ProductHandler = require("./application/handler/product-handler");
const OrderHandler = require("./application/handler/order-handler");
const AuthResolver = require("./infrastructure/resolver/auth-resolver");
const UserResolver = require("./infrastructure/resolver/user-resolver");
const ShopResolver = require("./infrastructure/resolver/shop-resolver");
const ProductResolver = require("./infrastructure/resolver/product-resolver");
const OrderResolver = require("./infrastructure/resolver/order-resolver");
const CustomerResolver = require("./infrastructure/resolver/customer-resolver");
const CustomerHandler = require("./application/handler/customer-handler");

module.exports = async (server) => {
  const firewall = new Firewall(cookie, jwt, fetch, new Logger("Firewall"));

  // Providers
  const mySqlDatabaseProvider = new MySqlDatabaseProvider(mysql, promisify);

  // Repositories
  const userRepository = new UserRepository(mySqlDatabaseProvider, new Hashing());
  const shopRepository = new ShopRepository(mySqlDatabaseProvider);
  const orderRepository = new OrderRepository(mySqlDatabaseProvider);
  const shopifyRepository = new ShopifyRepository(fetch);
  const erpRepository = new ErpRepository(fetch, new Logger("ErpRepository"), xmlConverter);

  // Handlers
  const productHandler = new ProductHandler(
    shopRepository,
    erpRepository,
    shopifyRepository,
    new Logger("ProductHandler")
  );
  const orderHandler = new OrderHandler(
    shopRepository,
    erpRepository,
    shopifyRepository,
    orderRepository,
    xmlConverter,
    new Logger("OrderHandler")
  );
  const customerHandler = new CustomerHandler(
    shopRepository,
    erpRepository,
    shopifyRepository,
    // xmlConverter,
    new Logger("CustomerHandler")
  );

  // Resolvers
  const authResolver = new AuthResolver(server, firewall, userRepository, new Logger("AuthResolver"));
  const userResolver = new UserResolver(server, firewall, userRepository, shopRepository, shopifyRepository);

  const shopResolver = new ShopResolver(
    server,
    firewall,
    shopRepository,
    shopifyRepository,
    productHandler,
    new Logger("ShopResolver")
  );
  const productResolver = new ProductResolver(
    server,
    firewall,
    productHandler,
    shopRepository,
    shopifyRepository,
    new Logger("ProductResolver")
  );
  const orderResolver = new OrderResolver(
    server,
    firewall,
    shopRepository,
    orderRepository,
    orderHandler,
    new Logger("OrderResolver")
  );
  const customerResolver = new CustomerResolver(
    server,
    shopRepository,
    customerHandler,
    new Logger("CustomerResolver")
  );

  orderHandler.handleFailedOrders(60000 * 60).then(() => productHandler.handle(customerHandler.handle));

  authResolver.resolve();
  userResolver.resolve();
  shopResolver.resolve();
  productResolver.resolve();
  orderResolver.resolve();
  customerResolver.resolve();

  return server;
};
