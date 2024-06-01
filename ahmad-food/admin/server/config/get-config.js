const config = require("./config.json");

module.exports = () => {
  const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, NODEMAILER, TWILIO, BUCKET_KEY } = process.env;

  // if(NODE_ENV !== "production")

  config.port = PORT || config.port;

  config.publicDir = process.cwd() + config.publicDir;

  // MySQL Database
  config.mysql.host = DB_HOST || config.mysql.host;
  config.mysql.port = DB_PORT || config.mysql.port;
  config.mysql.user = DB_USER || config.mysql.user;
  config.mysql.password = DB_PASS || config.mysql.password;

  // Nodemailer
  // config.nodemailer = NODEMAILER ? JSON.parse(NODEMAILER) : config.nodemailer;

  // Twilio
  // config.twilio = TWILIO ? JSON.parse(TWILIO) : config.twilio;

  // Google Storage
  // const keyFileName = process.cwd() + config.gCloud.keyFileName;
  // config.gCloud.credentials = JSON.parse(BUCKET_KEY ? BUCKET_KEY : fs.readFileSync(keyFileName, "utf8"));

  config.mysqlDatabaseBackupCron.dbUser = config.mysql.user;
  config.mysqlDatabaseBackupCron.dbPass = config.mysql.password;
  return config;
};
