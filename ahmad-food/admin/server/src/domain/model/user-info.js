class UserInfo {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.type = user.type;
    this.displayName = user.firstName + " " + user.lastName;
    this.gender = user.gender;
    this.city = user.city;
    this.postcode = user.postcode;
    this.street = user.street;
    this.notifications = user.notifications;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.about = user.about;
  }
}

module.exports = UserInfo;
