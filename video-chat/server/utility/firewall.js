// const UserInfo = require("../../domain/model/user-info");
// const CustomError = require("../../domain/model/custom-error");
class Firewall {
  constructor(cookie, jwt, config) {
    this.cookie = cookie;
    this.jwt = jwt;
    this.config = config;
  }

  hasBan(memberIP) {
    // todo: check if the client IP has a ban
    return false;
  }

  setTheCookie(memberInfo, response) {
    const token = this.createToken(memberInfo);
    response.cookie("userToken", token, this.config.cookieOptions);
  }
  updateToken(user, response) {
    const token = this.createToken(user);
    response.cookie("userToken", token, this.config.cookieOptions);
  }

  createToken(payload) {
    try {
      return this.jwt.sign({ payload }, this.config.secretKey);
    } catch (error) {
      return null;
    }
  }
  checkToken(cookie, ip) {
    try {
      const userToken = this.cookie.parse(cookie)["userToken"];
      const decodedUser = this.jwt.verify(userToken, this.config.secretKey).payload;
      // Check the client IP by adding, || decodedUser.ip !==ip
      if (!userToken || !decodedUser) return null;
      return decodedUser;
    } catch (error) {
      return null;
    }
  }
}

module.exports = Firewall;
