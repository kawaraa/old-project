const CustomError = require("../../domain/model/custom-error");
const uuid = require("uuid/v4");
const CreateHtmlElementCommand = require("../../domain/command/create-html-element-command");

// 1- post "/html" Create HTML element
// 1- put "/html" Delete HTML element

class HtmlResolver {
  constructor(server, firewall, htmlRepository, htmlFileHandler) {
    this.server = server;
    this.firewall = firewall;
    this.htmlRepository = htmlRepository;
    this.htmlFileHandler = htmlFileHandler;
  }

  resolve() {
    this.server.use("/html", this.firewall.authRequired);
    this.server.post("/html", this.createHtmlElement.bind(this));
    this.server.delete("/html", this.deleteHtmlElement.bind(this));
  }

  async createHtmlElement(request, response) {
    try {
      const elementData = await this.htmlRepository.createElement();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async deleteHtmlElement(request, response) {
    try {
      const elementId = await this.htmlRepository.deleteElement();
      this.htmlFileHandler.deleteFile(elementId);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
}

module.exports = HtmlResolver;
