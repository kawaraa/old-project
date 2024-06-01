const CustomError = require("../../domain/model/custom-error");

class UserResolver {
  constructor(server, firewall, accountRepository) {
    this.server = server;
    this.firewall = firewall;
    this.accountRepository = accountRepository;
  }

  resolve() {
    this.server.use("/user", this.firewall.authRequired);
    this.server.use("/user/state", this.onCheckState.bind(this));
    this.server.post("/user/profile/full-name", this.updateFullName.bind(this));
    this.server.post("/user/profile/about", this.updateAbout.bind(this));
  }

  async onCheckState(request, response) {
    response.json(request.user);
  }

  async updateFullName(request, response) {
    try {
      request.body.owner = request.user.id;
      const command = new UpdateFullNameCommand({ ...request.body });
      await this.profileRepository.updateFullName(command);
      request.user.displayName = command.displayName;
      this.firewall.updateToken(request.user, response);
      response.json(request.user);
    } catch (error) {
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async updateAbout(request, response) {
    try {
      request.body.owner = request.user.id;
      const command = new UpdateAboutCommand({ ...request.body });
      const profile = await this.profileRepository.updateAbout(command);
      response.json(profile);
    } catch (error) {
      response.status(500).end(CustomError.toJson(error));
    }
  }
}

module.exports = UserResolver;
