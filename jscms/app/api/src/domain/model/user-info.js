class UserInfo {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.firstName + " " + user.lastName;
    this.avatarUrl = user.avatarUrl;
    this.about = user.about;
  }
}

module.exports = UserInfo;
