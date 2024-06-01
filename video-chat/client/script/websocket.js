class Socket extends WebSocket {
  constructor(url) {
    super(url);
    this.onmessage = this.dispatch.bind(this);
    this._events = new Set();
  }

  emit(eventType, message) {
    const event = { type: eventType, message };
    this.send(this.toJSON(event));
    return true;
  }
  on(eventType, listener) {
    this._events.add(eventType);
    this.addEventListener(eventType, listener, false);
  }
  dispatch(event) {
    const { eventType, message } = this.parseJSON(event.data);
    if (!this._events.has(eventType)) throw new Error(`"${eventType}" event has no listener.`);
    this.dispatchEvent(new CustomEvent(eventType, { detail: message }));
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

export default Socket;
