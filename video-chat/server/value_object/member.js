const { TextEncoder, TextDecoder } = require("util");

class Member {
  constructor(clientSocket, memberInfo) {
    this.client = clientSocket;
    this.status = "online";
    this.setInfo(memberInfo);
    this._events = new Set();
    this.client.on("message", this.onData.bind(this));
    this.client.on("close", this.logout.bind(this));
    this.client.on("error", this.logout.bind(this));
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  setInfo(memberInfo) {
    for (let key in memberInfo) this[key] = memberInfo[key];
  }
  logout(error) {
    const { id, nickname, gender, country } = this;
    this.client.emit("LOGOUT", { id, nickname, gender, country });
  }
  on(eventType, listener) {
    this._events.add(eventType);
    if (eventType === "message") throw new Error(eventType + " is a reserved event and can't be used.");
    this.client.on(eventType, listener); // listen to event emitted by this.client.emit()
  }
  dispatch(eventType, message) {
    this.client.send(this.toJSON({ eventType, message }));
  }
  onData(data) {
    if (Buffer.isBuffer(data)) {
      const buffer = Buffer.concat([data, this.encoder.encode(`&id=${this.id}]`)]);
      return this.client.emit("BUFFER", buffer);
    }
    const { eventType, message } = this.parseJSON(data);
    if (!this._events.has(eventType)) throw new Error(`"${eventType}" event has no listener.`);
    message.sender = { id: this.id, nickname: this.nickname, gender: this.gender };
    this.client.emit(eventType, message); // emit an event to listener set by this.client.on()
  }

  toJSON(data) {
    try {
      const json = JSON.stringify(data);
      return json;
    } catch (e) {}
    return data;
  }
  parseJSON(data) {
    try {
      const json = JSON.parse(data);
      return json;
    } catch (e) {}
    return data;
  }
}

module.exports = Member;
