const CustomError = require("../model/custom-error");

class CreateUserCredentialCommand {
  constructor(account) {
    this._username = account.username;
    this._hashedPsw = account.psw;
  }
  set _username(value) {
    if (!value) throw new CustomError("username is required field");
    this.username = value.toLowerCase();
  }
  set _hashedPsw(value) {
    if (!value) throw new CustomError("Password is required field");
    else if (typeof value !== "string") value += "";
    else if (value.length < 8) throw new CustomError("Password must be at least 8 Characters / Numbers");
    this.hashedPsw = value;
  }
}

module.exports = CreateUserCredentialCommand;
