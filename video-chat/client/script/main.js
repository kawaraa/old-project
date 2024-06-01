// const url = "wss://fresh-tape-281621.uc.r.appspot.com/";
const url = window.location.origin.replace("https", "wss").replace("http", "ws");

const app = document.getElementById("app");
const startPopup = document.getElementById("start-popup");
const stageWrapper = document.getElementById("stage-wrapper");
const queueWrapper = document.getElementById("queue-wrapper");
const membersWrapper = document.getElementById("members-wrapper");
const conversation = document.getElementById("conversation");
const userCanvasPlayer = document.getElementById("user-camera");
const video = document.createElement("video");
const ctx = userCanvasPlayer.getContext("2d");
const encoder = new TextEncoder();
const decoder = new TextDecoder();

video.autoplay = true;
let recorder = null,
  i;
const members = {};
alert("Version 1");
function showMembersList() {
  membersWrapper.style.display = membersWrapper.style.display !== "flex" ? "flex" : "none";
}
(async () => {
  try {
    // const hdVideoResolution =  { width: { min: 1280 }, height: { min: 720 } } ;
    // const lowVideoResolution =  { width: { exact: 640 }, height: { exact: 480  } };
    // const audioQuality =  { sampleSize: 8, echoCancellation: true };
    const constraints = { video: { facingMode: "user" }, audio: true };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    recorder = new StereoAudioRecorder(mediaStream);
    video.srcObject = mediaStream;

    video.addEventListener("play", () => {
      userCanvasPlayer.width = video.videoWidth;
      userCanvasPlayer.height = video.videoHeight;
      video.muted = true;
      i = setInterval(() => ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight), 40);
    });
  } catch (error) {
    console.log(error);
    handleGetUserMediaError(error);
  }
})();

function join(e) {
  try {
    e.preventDefault();
    const { nickname, gender, room } = e.target;
    const query = `?nickname=${nickname.value}&gender=${gender.value}&country=${room.value}`;

    window.socket = new Socket(url + "/live" + query);
    window.socket.onclose = () => console.log("Closed");
    window.socket.onerror = (e) => console.log("Error: ", e);
    window.socket.on("LOGIN", ({ detail }) => handleLogin(detail.sender));
    window.socket.on("LOGOUT", ({ detail }) => handleLogout(detail.sender));
    window.socket.on("GET_MEMBERS", ({ detail }) => detail.payload.forEach((m) => handleLogin(m))); // second
    window.socket.on("MESSAGE", ({ detail }) => {
      const li = createAndAppend("li", conversation, { class: "message card", prepend: true });
      createAndAppend("span", li, { class: "message owner", text: detail.sender.nickname });
      createAndAppend("p", li, { class: "message content", text: detail.payload });
    });

    window.socket.on("AUDIO", ({ detail }) => detail.payload && new Audio(detail.payload).play());
    window.socket.on("VIDEO", ({ detail: { sender, payload } }) => {
      if (document.getElementById(sender.id)) members[sender.id].appendBuffer(payload);
    });
    window.socket.on("JOIN_QUEUE", ({ detail } = e) => {
      window.socket.dispatch({ data: { eventType: "LOGOUT", message: { sender: detail.sender } } });
      window.socket.dispatch({ data: { eventType: "LOGIN", message: { sender: detail.sender } } });
    });
    window.socket.on("LEAVE_QUEUE", ({ detail } = e) => {
      window.socket.dispatch({ data: { eventType: "LOGOUT", message: { sender: detail.sender } } });
      window.socket.dispatch({ data: { eventType: "LOGIN", message: { sender: detail.sender } } });
    });
    window.socket.onopen = async () => {
      // first
      try {
        console.log("Connected");
        const userCanvasPlayer = document.getElementById("user-video");
        const ctx = userCanvasPlayer.getContext("2d");
        userCanvasPlayer.width = video.videoWidth;
        userCanvasPlayer.height = video.videoHeight;

        const cache = [];
        recorder.onData = (blob) => {
          if (window.socket.readyState !== 1) return;
          const reader = new FileReader();
          cache.push(blob);
          reader.onload = (event) => {
            cache.shift();
            if (cache[0]) reader.readAsDataURL(cache[0]);
            window.socket.emit("AUDIO", event.target.result);
          };
          if (cache.length < 2) reader.readAsDataURL(blob);
        };

        clearInterval(i);
        i = setInterval(() => {
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          window.socket.emit("VIDEO", userCanvasPlayer.toDataURL("image/jpeg", 0.5));
        }, 30);
        startPopup.style.display = "none";
      } catch (error) {
        alert(error.toString());
      }
    };
  } catch (error) {
    alert(error.toString());
  }
}

function handleLogin(member) {
  const { id, status } = member;
  // if (status === "chat" || status === "listeners") {
  //   const div = createAndAppend("div", membersWrapper, { class: "member item" });
  //   const img = createAndAppend("img", div, { id, class: "member img" });
  // } else if (status === "queue") {
  //   const div = createAndAppend("div", queueWrapper, { class: "queue item" });
  //   const img = createAndAppend("img", div, { id, class: "queue img" });
  // } else if (status === "stage") {

  const div = createAndAppend("div", stageWrapper, { class: "stage item" });
  const canvas = createAndAppend("canvas", div, { id, class: "stage video" });
  const image = new Image(),
    cache = [];
  image.onload = (e) => {
    canvas.width = e.target.naturalWidth;
    canvas.height = e.target.naturalHeight;
    canvas.getContext("2d").drawImage(e.target, 0, 0);
    cache.shift();
    if (cache[0]) image.src = cache[0];
  };
  const appendBuffer = (base64) => {
    cache.push(base64);
    if (cache.length < 2) image.src = base64;
  };
  members[id] = { appendBuffer };
}

function handleLogout({ id } = member) {
  const element = document.getElementById(id);
  element && element.parentElement.parentElement.removeChild(element.parentElement);
  // if (stage.children.length > 2) stage.children[0].style.width = "100%";
}

function mute(e) {
  if (e.checked) recorder.stopRecording();
  else recorder.startRecording();
}

function sendMessage(form) {
  window.event.preventDefault();
  window.socket.emit("MESSAGE", { payload: form.message.value });
  form.reset();
}

function queue(e) {
  if (e.checked) window.socket.emit("JOIN_QUEUE", {});
  else window.socket.emit("LEAVE_QUEUE", {});
}

function leave(e) {
  recorder.stopRecording();
  clearInterval(i);
  i = setInterval(() => ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight), 20);
  startPopup.style.display = "block";
  if (window.socket.readyState === 1) window.socket.close();
  console.log("Left the discussion");
}

function handleGetUserMediaError(e) {
  switch (e.name) {
    case "NotFoundError":
      alert("Unable to open your call because no camera and/or microphone were found.");
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert("Error opening your camera and/or microphone: " + e.message + "(!)");
      break;
  }
  video.srcObject.getTracks().forEach((track) => track.stop());
}
