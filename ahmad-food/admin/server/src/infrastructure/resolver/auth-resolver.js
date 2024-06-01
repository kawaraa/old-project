"use strict";
const CustomError = require("../../domain/model/custom-error");
const CreateUserCredentialCommand = require("../../domain/command/create-user-credential-command");

class AuthResolver {
  constructor(server, firewall, userRepository, config) {
    this.server = server;
    this.firewall = firewall;
    this.userRepository = userRepository;
    this.config = config;
  }

  resolve() {
    this.server.post("/login", this.onLogin.bind(this));
    this.server.get("/state", this.firewall.authRequired, this.onCheckState.bind(this));
    this.server.use("/log-me-out", this.onLogout.bind(this));
  }

  async onLogin(request, response) {
    try {
      const account = new CreateUserCredentialCommand(request.body);
      const user = await this.userRepository.checkAccount(account.username, account.hashedPsw);
      if (!user) throw new CustomError("Incorrect combination of Username / Password");
      const token = await this.firewall.createToken({ ...user, ip: request.connection.remoteAddress });
      if (!token) return response.status(500).end(CustomError.toJson());
      response.cookie("employeeToken", token, this.config.cookieOption);
      response.json(user);
    } catch (error) {
      response.clearCookie("employeeToken");
      response.status(400).end(CustomError.toJson(error));
      console.log(error);
    }
  }
  onCheckState(request, response) {
    response.send(request.user);
  }
  onLogout(request, response) {
    response.clearCookie("employeeToken");
    response.redirect("/");
  }
}

module.exports = AuthResolver;
