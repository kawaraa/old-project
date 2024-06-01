const CustomError = require("../../domain/model/custom-error");
const UserInfo = require("../../domain/model/user-info");

class AccountRepository {
  constructor(mySqlProvider) {
    this.mySqlProvider = mySqlProvider;
  }

  async getAccountById(id) {
    const query = `SELECT * FROM user.account WHERE id=?`;
    const result = await this.mySqlProvider.query(query, id);
    return result[0];
  }

  async checkAccount(username, psw) {
    let query = `SELECT id, username, firstName, lastName, avatarUrl, about FROM user.account WHERE username = ?`;
    if (psw) query += " AND hashedPsw = ?";
    const result = await this.mySqlProvider.query(query, psw ? [username, psw] : [username]);
    if (!result[0] || !result[0].id) return null;
    return result[0];
  }
  async updateAbout(profile) {
    const query = "UPDATE user.profile SET about=?  WHERE owner=?";
    await this.mySqlProvider.query(query, [profile.about, profile.owner]);
    return this.getProfile(profile.owner);
  }

  async checkAuthorization(username, psw) {
    const user = await this.checkAccount(username, psw);
    if (!user) throw new CustomError("Unauthorized operation");
    return user;
  }
  async confirmAccount(id) {
    await this.mySqlProvider.query("UPDATE user.account SET confirmed=? WHERE id=?", [1, id]);
  }
}

module.exports = AccountRepository;
