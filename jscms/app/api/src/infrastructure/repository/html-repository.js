const MainHtmlRepository = require("./main-html-repository");

class HtmlRepository extends MainHtmlRepository {
  // 1- post "/html" Create HTML element
  // 1- put "/html" Delete HTML element
  async createElement(element) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async deleteElement(element) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
  }
}

module.exports = HtmlRepository;
