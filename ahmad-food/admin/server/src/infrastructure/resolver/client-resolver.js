"use strict";
const CreateClientCommand = require("../../domain/command/create-client-command");
const CustomError = require("../../domain/model/custom-error");

class ClientResolver {
  constructor(server, firewall, userRepository, config) {
    this.server = server;
    this.firewall = firewall;
    this.userRepository = userRepository;
    this.config = config;
  }

  resolve() {
    this.server.use("/client", this.firewall.adminRequired);
    this.server.get("/client/:searchText", this.onSearchForClients.bind(this));
    this.server.post("/client", this.onCreateClients.bind(this));
    this.server.post("/client/activate/:id", this.onActivateClient.bind(this));
    this.server.delete("/client/delete/:id", this.onDeleteClient.bind(this));
  }

  async onSearchForClients(request, response) {
    let searchText = request.params.searchText;
    try {
      searchText = searchText.length < 20 && !/all/gim.test(searchText) ? searchText : "";
      const clients = await this.userRepository.getClients(searchText);
      response.json(clients);
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onCreateClients(request, response) {
    try {
      const command = new CreateClientCommand(request.body);
      await this.userRepository.createClient(command);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onActivateClient(request, response) {
    try {
      const id = request.params.id.length < 15 ? request.params.id : "find-nothing";
      await this.userRepository.updateClientStatus(id);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }

  async onDeleteClient(request, response) {
    try {
      const id = request.params.id.length < 15 ? request.params.id : "find-nothing";
      await this.userRepository.deleteClient(id);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
}

module.exports = ClientResolver;
