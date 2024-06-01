const CustomError = require("../../domain/model/custom-error");
const uuid = require("uuid/v4");
// const CreateHtmlElementCommand = require("../../domain/command/");

// 3- post "/style" Create Style for the HTML element
// 3- put "/style"  Update Style for the HTML element
// 3- delete "/style"  Delete Style for the HTML element

class CssResolver {
  constructor(server, firewall, cssRepository, htmlFileHandler) {
    this.server = server;
    this.firewall = firewall;
    this.cssRepository = cssRepository;
    this.htmlFileHandler = htmlFileHandler;
  }

  resolve() {
    this.server.use("/css", this.firewall.authRequired);
    this.server.post("/css", this.createStyle.bind(this));
    this.server.put("/css", this.updateStyle.bind(this));
    this.server.delete("/css", this.deleteStyle.bind(this));
  }

  async createStyle(request, response) {
    try {
      const elementData = await this.cssRepository.createStyle();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async updateStyle(request, response) {
    try {
      const elementData = await this.cssRepository.updateStyle();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async deleteStyle(request, response) {
    try {
      const elementData = await this.cssRepository.deleteStyle();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
}

module.exports = CssResolver;
