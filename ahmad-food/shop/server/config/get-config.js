const config = require("./config.json");

module.exports = () => {
  const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, NODEMAILER, SECRET_KEY } = process.env;

  // if(NODE_ENV !== "production")

  config.port = PORT || config.port;
  config.firewall.secretKey = SECRET_KEY || config.firewall.secretKey;

  config.publicDir = process.cwd() + config.publicDir;

  // MySQL Database
  config.mysql.host = DB_HOST || config.mysql.host;
  config.mysql.port = DB_PORT || config.mysql.port;
  config.mysql.user = DB_USER || config.mysql.user;
  config.mysql.password = DB_PASS || config.mysql.password;

  // Nodemailer
  config.nodemailer = NODEMAILER ? JSON.parse(NODEMAILER) : config.nodemailer;
  return config;
};
