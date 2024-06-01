"use strict";
const CustomError = require("../../domain/model/custom-error");
const Credential = require("../../domain/model/credential");

class AuthResolver {
  constructor(server, firewall, accountRepository, mailHandler) {
    this.server = server;
    this.firewall = firewall;
    this.accountRepository = accountRepository;
    this.mailHandler = mailHandler;
    this.config = env.authResolver;
  }

  resolve() {
    this.server.post("/login", this.onLogin.bind(this));
    this.server.use("/logout", this.onLogout.bind(this));
  }
  async onLogin(request, response) {
    try {
      const { username, hashedPsw } = new Credential(request.body);
      const user = await this.accountRepository.checkAccount(username, hashedPsw);
      if (!user) throw new CustomError("Incorrect combination of Username / Password");
      const token = await this.firewall.createToken(user);
      if (!token) return response.status(500).end(CustomError.toJson());
      response.cookie("userToken", token, this.config.cookieOption);
      // response.cookie("Authorization", "bearer " + token, this.config.cookieOption); // Bearer Authorization
      response.json(user);
    } catch (error) {
      response.clearCookie("userToken");
      response.status(400).end(CustomError.toJson(error));
      console.log(error);
    }
  }
  onLogout(request, response) {
    response.clearCookie("userToken");
    response.redirect("/admin/login");
  }
}

module.exports = AuthResolver;
