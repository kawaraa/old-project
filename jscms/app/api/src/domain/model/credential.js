const CustomError = require("./custom-error");
const pswError = "Min 8 symbols, minimum 1 special characters, minimum 1 number, minimum 1 capital letter";

class Credential {
  constructor(account) {
    this._username = account.username;
    this._hashedPsw = account.password;
  }
  set _username(value) {
    if (!value) throw new CustomError("username is required field");
    this.username = value;
  }
  set _hashedPsw(value) {
    const pswValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!value) throw new CustomError("Password is required field");
    else if (typeof value !== "string") value += "";
    else if (value.length < 8) throw new CustomError("Password must be at least 8 Characters / Numbers");
    // else if (pswValidator.test(value)) throw new CustomError(pswError);
    this.hashedPsw = value;
  }
}

module.exports = Credential;
