const { Validator } = require("k-utilities");

class MemberInfo {
  constructor(user) {
    this.id = "id-" + crypto.randomUUID();
    this._nickname = user.nickname;
    this._gender = user.gender;
    this._room = user.room;
    this.status = "chat"; //chat,listener,queue,live
    this.live = false;
    this.timer = 0;
  }

  get _nickname() {
    return this.nickname;
  }
  set _nickname(value) {
    if (Validator.isString(value, 1, 25)) return (this.nickname = value);
    this.nickname = ("user_" + Math.random()).replace(/\./gi, "");
  }
  get _gender() {
    return this.gender;
  }
  set _gender(value) {
    if (!Validator.isString(value, 3, 6)) return (this.gender = "couple");
    const g = value.toLowerCase();
    if (g !== "male" || g !== "female" || g !== "couple") return (this.gender = "couple");
    this.gender = value;
  }
  get _room() {
    return this.room;
  }
  set _room(value) {
    if (!Validator.isString(value, 4, 18)) return (this.room = "GLOBAL");
    this.room = value;
  }
}

module.exports = MemberInfo;
