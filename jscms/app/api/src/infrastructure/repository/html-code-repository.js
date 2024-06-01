const MainHtmlRepository = require("./main-html-repository");

class HtmlCodeRepository extends MainHtmlRepository {
  constructor(mySqlProvider) {
    super(mySqlProvider);
  }

  // 4- post "/code"  Create script, style, div tag
  // 4- put "/code" Update script, style, div tag
  // 4- delete "/code" Delete script, style, div tag
  async createCodeTag(code) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async updateCodeTag(code) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return this.getElementData(element.id);
  }
  async deleteCodeTag(code) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
  }
}

module.exports = HtmlCodeRepository;
