const UserInfo = require("../../domain/model/user-info");
const CustomError = require("../../domain/model/custom-error");

class Firewall {
  constructor(cookie, jwt, config) {
    this.cookie = cookie;
    this.jwt = jwt;
    this.config = config;
    this.authRequired = this.checkAuthentication.bind(this);
    this.adminRequired = this.checkAdmin.bind(this);
  }

  checkAuthentication(request, response, next) {
    const user = this.checkToken(request.headers.cookie, request.connection.remoteAddress);
    if (!user) return response.status(401).end(CustomError.toJson(new CustomError("Unauthorized request")));
    request.user = new UserInfo(user);
    next();
  }
  checkAdmin(request, response, next) {
    const user = this.checkToken(request.headers.cookie, request.connection.remoteAddress);
    if (!user) return response.status(401).end(CustomError.toJson(new CustomError("Unauthorized request")));
    request.user = new UserInfo(user);
    if (user.type === "admin") return next();
    response.clearCookie("employeeToken");
    return response.status(401).end(CustomError.toJson(new CustomError("Only the admin can do this action")));
  }

  createToken(payload) {
    try {
      return this.jwt.sign({ payload }, this.config.secretKey);
    } catch (error) {
      return null;
    }
  }

  checkToken(cookie, ip) {
    const userToken = this.cookie.parse(cookie || "")["employeeToken"];
    const decodedUser = this.parseToken(userToken);
    return decodedUser && decodedUser.ip === ip ? decodedUser : null;
  }
  parseToken(token) {
    try {
      return this.jwt.verify(token, this.config.secretKey).payload;
    } catch (error) {
      return null;
    }
  }
}

module.exports = Firewall;
// isAuthenticated(request) {
//   if (!request.headers.cookie) return false;
//   const user = this.checkToken(request.headers.cookie, request.connection.remoteAddress);
//   if (!user) return false;
//   request.user = new UserInfo(user);
//   return true;
// }
// updateToken(user, response) {
//   const token = this.createToken(user);
//   response.cookie("employeeToken", token, this.config.cookieOption);
// }
