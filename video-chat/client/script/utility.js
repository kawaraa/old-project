function createAndAppend(name, parent, options = { prepend: false }) {
  const elem = document.createElement(name);
  options.prepend ? parent.prepend(elem) : parent.appendChild(elem);
  delete options.prepend;
  if (options.text) (elem.innerHTML = options.text) + delete options.text;
  for (let key in options) elem.setAttribute(key, options[key]);
  return elem;
}

/** ================================================== */

class Socket extends WebSocket {
  constructor(url) {
    super(url);
    this.onmessage = this.onData.bind(this);
    this._events = new Set();
    this.binaryType = "arraybuffer";
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  emit(eventType, message) {
    if (eventType === "VIDEO" || eventType === "AUDIO") {
      return this.send(this.encoder.encode(message + `[eventType=${eventType}`));
    }
    const event = { type: eventType, message };
    this.send(this.toJSON(event));
    return true;
  }
  on(eventType, listener) {
    this._events.add(eventType);
    this.addEventListener(eventType, listener, false);
  }
  onData({ data }) {
    if (typeof data !== "string") {
      const string = this.decoder.decode(data);
      const info = string.substring(string.indexOf("["), string.length);
      const payload = string.replace(info, "");
      const sender = this.parseUREncoded(info.replace("[", "").replace("]", ""));
      return this.dispatchEvent(new CustomEvent(sender.eventType, { detail: { sender, payload } }));
    }
    const { eventType, message } = this.parseJSON(data);
    if (!this._events.has(eventType)) throw new Error(`"${eventType}" event has no listener.`);
    this.dispatchEvent(new CustomEvent(eventType, { detail: message }));
  }
  parseUREncoded(url) {
    let data = {};
    if (url.length < 3) return data;
    let query = url.replace("?", "").split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      data[pair[0]] = pair[1];
    }
    return data;
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

/** ================================================== */

class StereoAudioRecorder {
  // { sampleRate: 7600, bufferSize: 0 }; it supposed to be like that { sampleRate: 44100, bufferSize: 4096 }
  constructor(mediaStream, config = { sampleRate: 44100, bufferSize: 8192 }) {
    this.bufSize = config.bufferSize;
    this.legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];
    this.sampleRate = config.sampleRate;
    this._initialize(mediaStream);
  }
  set onData(fun) {
    if (typeof fun === "function") this.startRecording();
    else this.stopRecording();
    this._onData = fun;
  }

  _initialize(mediaStream) {
    // "0" means, let chrome decide the most accurate buffer-size for current platform.
    this.bufSize = this.legalBufferValues.indexOf(this.bufSize) < 0 ? 0 : this.bufSize;

    if (!mediaStream || !mediaStream.getTracks || !mediaStream.getTracks().find((t) => t.kind === "audio")) {
      throw new Error("Your stream has no audio tracks.");
    }
    // const mediaRecorder = new MediaRecorder(mediaStream);
    // mediaRecorder.ondataavailable = (e) => console.log(e);
    // mediaRecorder.start(0);

    const AudioCTX = window.AudioContext || webkitAudioContext || mozAudioContext;
    if (!AudioCTX) throw new Error("Sorry, Recording audio is not support in your browser.");
    this.audioCtx = new AudioCTX();
    // this.sampleRate = this.audioCtx.sampleRate;

    // creates an audio node from the microphone incoming stream
    this.audioSourceNode = this.audioCtx.createMediaStreamSource(mediaStream);

    if (this.audioCtx.createScriptProcessor) {
      this.recorder = this.audioCtx.createScriptProcessor(this.bufSize, 2, 2);
    } else if (context.createJavaScriptNode) {
      this.recorder = this.audioCtx.createJavaScriptNode(this.bufSize, 2, 2);
    } else {
      throw new Error("WebAudio API has no support on this browser.");
    }

    this.recorder.onaudioprocess = this._handleConversion.bind(this);
  }
  startRecording() {
    // connect the stream input to the recorder
    this.audioSourceNode.connect(this.recorder);
    // to prevent self audio to be connected with speakers
    if (this.audioCtx.createMediaStreamDestination) {
      this.recorder.connect(this.audioCtx.createMediaStreamDestination());
    } else {
      this.recorder.connect(this.audioCtx.destination);
    }
    this.audioCtx.resume();
  }
  stopRecording() {
    this.recorder.disconnect();
    this.audioSourceNode.disconnect(this.recorder);
    this.audioCtx.suspend();
  }

  _handleConversion({ inputBuffer }) {
    const leftChannelBuffer = inputBuffer.getChannelData(0),
      rightChannelBuffer = inputBuffer.getChannelData(1);

    // we interleave both channels together
    const interleaved = this.interleave(leftChannelBuffer, rightChannelBuffer);

    // create the buffer and view to create the .WAV file
    const buffer = new ArrayBuffer(44 + interleaved.length * 2);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    this.writeUTFBytes(view, 0, "RIFF");
    view.setUint32(4, 44 + interleaved.length * 2, true);
    this.writeUTFBytes(view, 8, "WAVE");
    // FMT sub-chunk
    this.writeUTFBytes(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    view.setUint32(24, this.sampleRate, true);
    view.setUint32(28, this.sampleRate * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    // data sub-chunk
    this.writeUTFBytes(view, 36, "data");
    view.setUint32(40, interleaved.length * 2, true);

    // write the PCM samples
    let lng = interleaved.length;
    let index = 44;
    let volume = 1;
    for (let i = 0; i < lng; i++) {
      view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
      index += 2;
    }

    // our final binary blob that we can hand off
    if (typeof this._onData === "function") this._onData(new Blob([view], { type: "audio/wav" }));
    // if (typeof this._onData === "function") this._onData(view.buffer);
  }

  // Once flat, we can interleave both channels together:
  interleave(leftChannelBuffer, rightChannelBuffer) {
    let length = leftChannelBuffer.length + rightChannelBuffer.length;
    let result = new Float32Array(length);
    let inputIndex = 0;
    for (let index = 0; index < length; ) {
      result[index++] = leftChannelBuffer[inputIndex];
      result[index++] = rightChannelBuffer[inputIndex];
      inputIndex++;
    }
    return result;
  }

  // We then add the little writeUTFBytes utility function:
  writeUTFBytes(view, offset, string) {
    let lng = string.length;
    for (let i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
}
