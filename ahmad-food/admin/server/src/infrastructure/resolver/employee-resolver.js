"use strict";
const CustomError = require("../../domain/model/custom-error");
const CreateEmployeeCommand = require("../../domain/command/create-employee-command");

class WorkerResolver {
  constructor(server, firewall, userRepository, config) {
    this.server = server;
    this.firewall = firewall;
    this.userRepository = userRepository;
    this.config = config;
  }

  resolve() {
    this.server.use("/employee/", this.firewall.adminRequired);
    this.server.get("/employee/:searchText", this.onSearchForEmployees.bind(this));
    this.server.post("/employee/add", this.onAddEmployee.bind(this));
    this.server.delete("/employee/delete/:id", this.onDeleteEmployee.bind(this));
  }

  async onSearchForEmployees(request, response) {
    let searchText = request.params.searchText;
    try {
      searchText = searchText.length < 20 && !/all/gim.test(searchText) ? searchText : "";
      const employees = await this.userRepository.getEmployees(searchText);
      response.json(employees);
    } catch (error) {
      console.log(error);
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onAddEmployee(request, response) {
    try {
      const command = new CreateEmployeeCommand(request.body);
      await this.userRepository.createEmployee(command);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onDeleteEmployee(request, response) {
    try {
      const id = request.params.id.length < 15 ? request.params.id : "find-nothing";
      await this.userRepository.deleteEmployee(id);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
}

module.exports = WorkerResolver;
