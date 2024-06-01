module.exports = () => {
  const os = require("os");
  const config = require("./config.json");
  let = variables = null;

  try {
    variables = require("./variable.json");
  } catch (error) {
    variables = process.env;
  }

  config.port = variables.PORT;

  config.firewall.secretKey = variables.FIREWALL_SECRET_KEY;
  config.firewall.superUsername = variables.SUPER_USERNAME;
  config.firewall.superUserPassword = variables.SUPER_USER_PASSWORD;

  config.mysql.host = variables.MYSQL_HOST;
  config.mysql.port = variables.MYSQL_PORT;
  config.mysql.user = variables.MYSQL_USER;
  config.mysql.password = variables.MYSQL_PASSWORD;
  config.mysql.database = variables.DATABASE;
  config.mysql.connectionUrl = process.env.CLEARDB_DATABASE_URL;

  config.ftpProvider.host = variables.FTP_HOST;
  config.ftpProvider.user = variables.FTP_USER;
  config.ftpProvider.password = variables.FTP_PASSWORD;
  config.ftpProvider.secure = variables.FTP_SECURE;

  // config.ErpRepository.tmpFolder = os.tmpdir() + "/products/";

  global.env = Object.freeze(config);
};
