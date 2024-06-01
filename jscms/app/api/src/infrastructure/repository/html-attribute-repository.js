const MainHtmlRepository = require("./main-html-repository");

class HtmlAttributeRepository extends MainHtmlRepository {
  constructor(mySqlProvider) {
    super(mySqlProvider);
  }

  // 2- post "/attribute" Create HTML attribute
  // 2- put "/attribute" Update HTML attribute
  // 2- delete "/attribute" Delete HTML attribute
  async createAttribute(attribute) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async updateAttribute(attribute) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async deleteAttribute(attribute) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
  }
}

module.exports = HtmlAttributeRepository;
