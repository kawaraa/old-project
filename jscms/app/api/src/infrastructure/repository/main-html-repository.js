const container = require("./container.json");

class MainHtmlRepository {
  constructor(mySqlProvider) {
    this.mySqlProvider = mySqlProvider;
  }

  // 1- post "/html" Create HTML element
  // 1- put "/html" Delete HTML element
  async getElementData(elementId) {
    let query = `INSERT INTO `;
    // const result = await this.mySqlProvider.query(query, [id]);
    return container;
  }
}

module.exports = MainHtmlRepository;
