const CreateHtmlElementCommand = require("../../domain/command/create-html-element-command");
const MainHtmlRepository = require("./main-html-repository");

class CssRepository extends MainHtmlRepository {
  constructor(mySqlProvider) {
    super(mySqlProvider);
  }

  // 3- post "/style" Create Style for the HTML element
  // 3- put "/style"  Update Style for the HTML element
  // 3- delete "/style"  Delete Style for the HTML element
  async createStyle(css) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async updateStyle(css) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async deleteStyle(css) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
  }
}

module.exports = CssRepository;
