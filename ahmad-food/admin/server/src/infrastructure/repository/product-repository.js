const CustomError = require("../../domain/model/custom-error");

class ProductRepository {
  constructor(mySqlProvider, config) {
    this.mySqlProvider = mySqlProvider;
    this.config = config;
  }

  async search(searchCriteria) {
    const values = ("%" + searchCriteria.text + "% ").repeat(9).trim().split(" ");
    const query = `SELECT number, name, type, amount, unit, costPrice, retailPrice, wholesalePrice, inStock, description, (SELECT SUM(boxSize * box) FROM store.soldItem WHERE productNumber = number) AS totalSold FROM store.product WHERE number LIKE ? OR name LIKE ? OR type LIKE ? OR unit LIKE ? OR costPrice LIKE ? OR retailPrice LIKE ? OR wholesalePrice LIKE ? OR inStock LIKE ? OR description LIKE ? ORDER BY ${searchCriteria.orderBy} DESC`;

    return this.mySqlProvider.query(query, values);
  }

  async createProduct(product) {
    return this.mySqlProvider.query(`INSERT INTO store.product SET ?`, product);
  }

  async onUpdateProductQuantity({ quantity, number } = product) {
    const query = `UPDATE store.product SET inStock=inStock + ? WHERE number=?`;
    return this.mySqlProvider.query(query, [quantity, number]);
  }

  async deleteProduct(number) {
    return this.mySqlProvider.query("DELETE FROM store.product WHERE number=?", number);
  }
}

module.exports = ProductRepository;
