const Member = require("../value_object/member");
const MemberInfo = require("../model/Member-info");
const { Validator } = require("k-utilities");

class RoomResolver {
  constructor(webSocket, firewall, config) {
    this.socket = webSocket;
    this.firewall = firewall;
    this.config = config;
    this.members = [];
    this.rooms = {};
  }

  resolve() {
    this.socket.on("connection", this.onConnect.bind(this));
    setInterval(this.sortUpMembers, 1000 * 30);
  }
  onConnect(newSocket, request) {
    const memberIP = request.socket.remoteAddress;
    if (this.firewall.hasBan(memberIP)) return newSocket.destroy();
    const memberInfo = new MemberInfo(Validator.parseUREncoded(request.url));
    // this.firewall.setTheCookie(response);
    const member = new Member(newSocket, memberInfo);
    member.IP = memberIP;

    member.on("LOGOUT", this.userLoggedOut.bind(this));
    member.on("MESSAGE", (msg) => this.rooms[member.room].forEach((m) => m.dispatch("MESSAGE", msg)));
    member.on("JOIN_QUEUE", () => {
      if (!this.rooms[member.room]) return;
      const { room, id, nickname, gender, status } = member;
      member.status = "queue";
      this.broadCast("JOIN_QUEUE", { sender: { id, nickname, gender, status } }, room);
    });
    member.on("LEAVE_QUEUE", () => {
      if (!this.rooms[member.room]) return;
      const { room, id, nickname, gender, status } = member;
      member.status = "listeners";
      this.broadCast("LEAVE_QUEUE", { sender: { id, nickname, gender, status } }, room);
    });
    member.on("BUFFER", (message) => this.broadCastAudioVideo("BUFFER", message, member));

    this.addNewMember(member);
  }

  addNewMember(member) {
    const { room, id, nickname, gender } = member;
    if (!this.rooms[room]) {
      this.rooms[room] = [];
      member.status = "queue";
    } else {
      const membersInQueue = this.rooms[room].filter((member) => member.status === "queue");
      const membersOnStage = this.rooms[room].filter((member) => member.status === "stage");
      if (!membersInQueue[0] && !membersOnStage[11]) member.status = "stage";
    }
    let payload = this.rooms[room].map(({ id, nickname, gender, status }) => {
      return { id, nickname, gender, status };
    });

    member.dispatch("GET_MEMBERS", { payload });
    this.broadCast("LOGIN", { sender: { id, nickname, gender, status: member.status } }, room);

    this.rooms[room].push(member);
    console.log(`${member.nickname} logged in.\n ${this.socket.clients.size} users are connected`);
  }
  userLoggedOut(member) {
    const { room, id, nickname, gender, status } = member;
    if (!this.rooms[room]) return;
    this.rooms[room] = this.rooms[room].filter((member) => member.id !== id);
    this.broadCast("LOGOUT", { sender: { id, nickname, gender, status } }, room);

    console.log(`${member.nickname} logged out.\n ${this.socket.clients.size} users are connected`);
  }

  broadCastAudioVideo(eventType, message, member) {
    const { id, room, status } = member;
    if (eventType === "BUFFER") {
      return this.rooms[room].forEach((m) => m.id !== id && m.client.send(message));
    }

    const length = message.payload.length;
    // (eventType === "AUDIO" && !length) || length < 10000 ? (member.live = false) : (member.live = true);
    if (status !== "stage") return;
    this.rooms[room].forEach((m) => m.id !== id && m.status !== "chat" && m.dispatch(eventType, message));
  }

  broadCast(eventType, message, room) {
    const { id } = message.sender;
    this.rooms[room].forEach((mbr) => mbr.id !== id && mbr.dispatch(eventType, message));
  }

  sortUpMembers() {
    for (let room in this.rooms) {
      const membersOnStage = this.rooms[room].filter((member) => member.status === "stage");
      this.rooms[room].forEach((member) => {
        if (!member.live) return;
        if (member.status === "chat") member.status = "listeners";
        else if (member.status === "stage" && member.timer >= Date.now()) {
          member.status = "listeners";
          this.broadCast("LOGOUT", { sender: { id: member.id } }, member.room);
          this.broadCast("LOGIN", { sender: { id: member.id, status: member.status } }, member.room);
        } else if (membersOnStage < 12 && member.status === "queue") {
          member.timer = Date.now() + 5 * 60 * 1000;
          member.status = "stage";
          this.broadCast("LOGOUT", { sender: { id: member.id } }, member.room);
          this.broadCast("LOGIN", { sender: { id: member.id, status: member.status } }, member.room);
        }
      });
    }
  }
}

module.exports = RoomResolver;
