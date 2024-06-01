const CustomError = require("../../domain/model/custom-error");
const uuid = require("uuid/v4");
// const CreateHtmlElementCommand = require("../../domain/command/");

// 4- post "/code"  Create script, style, div tag
// 4- put "/code" Update script, style, div tag
// 4- delete "/code" Delete script, style, div tag

class HtmlCodeResolver {
  constructor(server, firewall, htmlCodeRepository, htmlFileHandler) {
    this.server = server;
    this.firewall = firewall;
    this.htmlCodeRepository = htmlCodeRepository;
  }

  resolve() {
    this.server.use("/code", this.firewall.authRequired);
    this.server.post("/code", this.createHtmlCode.bind(this));
    this.server.put("/code", this.updateHtmlCode.bind(this));
    this.server.delete("/code", this.deleteHtmlCode.bind(this));
  }

  async createHtmlCode(request, response) {
    try {
      const elementData = await this.htmlCodeRepository.createCodeTag();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async updateHtmlCode(request, response) {
    try {
      const elementData = await this.htmlCodeRepository.updateCodeTag();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async deleteHtmlCode(request, response) {
    try {
      const elementData = await this.htmlCodeRepository.deleteCodeTag();
      this.htmlFileHandler.updateFile(elementData);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
}

module.exports = HtmlCodeResolver;
