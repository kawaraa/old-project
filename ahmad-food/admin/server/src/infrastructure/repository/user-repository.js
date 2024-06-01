const CustomError = require("../../domain/model/custom-error");

class UserRepository {
  constructor(mySqlProvider, config) {
    this.mySqlProvider = mySqlProvider;
    this.config = config;
  }

  async checkAccount(username, psw) {
    let query = `SELECT id, username, type, firstName, lastName, gender, city, postcode, street, phoneNumber, email, about FROM user.employee WHERE username=?`;

    if (psw) query += " AND hashedPsw = ?";
    const result = await this.mySqlProvider.query(query, psw ? [username, psw] : username);
    if (!result[0] || !result[0].id) return null;
    return result[0];
  }

  async getEmployees(searchText) {
    const values = ("%" + searchText + "% ").repeat(10).trim().split(" ");
    const query = `SELECT id, username, type, firstName, lastName, gender, city, postcode, street, phoneNumber, email, about FROM user.employee WHERE username LIKE ? OR firstName LIKE ? OR lastName LIKE ? OR gender LIKE ? OR city LIKE ? OR postcode LIKE ? OR street LIKE ? OR phoneNumber LIKE ? OR email LIKE ? OR about LIKE ?`;

    const result = await this.mySqlProvider.query(query, values);
    return result.filter((item) => item.type !== "admin");
  }
  createEmployee(employee) {
    return this.mySqlProvider.query(`INSERT INTO user.employee SET ?`, employee);
  }
  deleteEmployee(id) {
    return this.mySqlProvider.query("DELETE FROM user.employee WHERE id=?", id);
  }

  async getClients(searchText) {
    const values = ("%" + searchText + "% ").repeat(10).trim().split(" ");
    const query = `SELECT id, accountStatus, firstName, lastName, gender, vatNumber, city, postcode, street, phoneNumber, email, about FROM user.client WHERE email LIKE ? OR firstName LIKE ? OR lastName LIKE ? OR gender LIKE ? OR city LIKE ? OR postcode LIKE ? OR street LIKE ? OR phoneNumber LIKE ? OR vatNumber LIKE ? OR about LIKE ?`;

    return this.mySqlProvider.query(query, values);
  }
  createClient(client) {
    return this.mySqlProvider.query(`INSERT INTO user.client SET ?`, client);
  }
  async updateClientStatus(id) {
    const query = "SELECT * FROM user.client WHERE id=? AND hashedPsw LIKE '%specified%'";
    const result = await this.mySqlProvider.query(query, id);

    if (result[0]) throw new CustomError("You can't' activate client if the client doesn't have account");
    return this.mySqlProvider.query("UPDATE user.client SET accountStatus=1 WHERE id=?", id);
  }
  async deleteClient(id) {
    return this.mySqlProvider.query("DELETE FROM user.client WHERE id=?", id);
  }
}

module.exports = UserRepository;
