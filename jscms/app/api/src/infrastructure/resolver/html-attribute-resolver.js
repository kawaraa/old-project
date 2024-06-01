const CustomError = require("../../domain/model/custom-error");
const uuid = require("uuid/v4");
// const CreateHtmlElementCommand = require("../../domain/command/");

// 2- post "/attribute" Create HTML attribute
// 2- put "/attribute" Update HTML attribute
// 2- delete "/attribute" Delete HTML attribute

class HtmlAttributeResolver {
  constructor(server, firewall, htmlAttributeRepository, htmlFileHandler) {
    this.server = server;
    this.firewall = firewall;
    this.htmlAttributeRepository = htmlAttributeRepository;
    this.htmlFileHandler = htmlFileHandler;
  }

  resolve() {
    this.server.use("/attribute", this.firewall.authRequired);
    this.server.post("/attribute", this.createHtmlAttribute.bind(this));
    this.server.put("/attribute", this.updateHtmlAttribute.bind(this));
    this.server.delete("/attribute", this.deleteHtmlAttribute.bind(this));
  }

  async createHtmlAttribute(request, response) {
    try {
      const elementData = await this.htmlAttributeRepository.createAttribute();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async updateHtmlAttribute(request, response) {
    try {
      const elementData = await this.htmlAttributeRepository.updateAttribute();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async deleteHtmlAttribute(request, response) {
    try {
      const elementData = await this.htmlAttributeRepository.deleteAttribute();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
}

module.exports = HtmlAttributeResolver;
