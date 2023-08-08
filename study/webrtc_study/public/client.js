const roomSelectionContainer = document.getElementById(
  "room-selection-container"
);
const roomInput = document.getElementById("room-input");
const connectButton = document.getElementById("connect-button");

const videoChatContainer = document.getElementById("video-chat-container");
const localVideoComponent = document.getElementById("local-video");
const remoteAudioComponent = document.getElementById("remote-audio");

//채팅을 위한 변수 선언
const chatContainer = document.getElementById("chat-container");
const chatInput = document.getElementById('chat-input');
const sendMessageButton = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

const socket = io();
const mediaConstraints = {
  audio: {
    echoCancellation: false,   // Enable echo cancellation
    noiseSuppression: true,   // Enable noise suppression
    autoGainControl: true,    // Enable automatic gain control
    sampleRate: 44100,        // Set desired sample rate
  },
  video: false
};
let localStream;
let remoteStream;
let isRoomCreator;
let rtcPeerConnection;
let roomId;
const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};


connectButton.addEventListener("click", () => {
  joinRoom(roomInput.value);
});

socket.on("room_created", async () => {
  console.log("Socket event callback: room_created");

  await setLocalStream(mediaConstraints);
  isRoomCreator = true;
});

socket.on("room_joined", async () => {
  console.log("Socket event callback: room_joined");

  await setLocalStream(mediaConstraints);
  socket.emit("start_call", roomId);
});

socket.on("full_room", () => {
  console.log("Socket event callback: full_room");
  alert("The room is full, please try another one");
});

function joinRoom(room) {
  if (room == "") {
    alert("Please type a room ID");
  } else {
    roomId = room;
    socket.emit("join", room);
    showVideoConference();
  }
}

function showVideoConference() {
  roomSelectionContainer.style = "display: none";
  videoChatContainer.style = "display: block";
}

async function setLocalStream(mediaConstraints) {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  } catch (error) {
    console.error("Could not get user media", error);
  }

  localStream = stream;
  // localVideoComponent.srcObject = stream;
}

socket.on("start_call", async () => {
  console.log("Socket event callback: start_call");

  if (isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    await createOffer(rtcPeerConnection);
  }
});

socket.on("webrtc_offer", async (event) => {
  console.log("Socket event callback: webrtc_offer");

  if (!isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
    await createAnswer(rtcPeerConnection);
  }
});

socket.on("webrtc_answer", (event) => {
  console.log("Socket event callback: webrtc_answer");
  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
});

socket.on("webrtc_ice_candidate", (event) => {
  console.log("Socket event callback: webrtc_ice_candidate");

  var candidate = new RTCIceCandidate({
    sdpMLineIndex: event.label,
    candidate: event.candidate,
  });

  rtcPeerConnection.addIceCandidate(candidate);
});

//FUNCTIONS

function addLocalTracks(rtcPeerConnection) {
  localStream.getTracks().forEach((track) => {
    rtcPeerConnection.addTrack(track, localStream);
  });
}

async function createOffer(rtcPeerConnection) {
  let sessionDescription;
  try {
    sessionDescription = await rtcPeerConnection.createOffer();
    rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (error) {
    console.error(error);
  }

  socket.emit("webrtc_offer", {
    type: "webrtc_offer",
    sdp: sessionDescription,
    roomId,
  });
}

async function createAnswer(rtcPeerConnection) {
  let sessionDescription;
  try {
    sessionDescription = await rtcPeerConnection.createAnswer();
    rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (error) {
    console.error(error);
  }

  socket.emit("webrtc_answer", {
    type: "webrtc_answer",
    sdp: sessionDescription,
    roomId,
  });
}

function setRemoteStream(event) {
  remoteAudioComponent.srcObject = event.streams[0];
  remoteStream = event.stream;
}

function sendIceCandidate(event) {
  if (event.candidate) {
    socket.emit("webrtc_ice_candidate", {
      roomId,
      label: event.candidate.sdpMLineIndex,
      candidate: event.candidate.candidate,
    });
  }
}

//채팅 코드
sendMessageButton.addEventListener('click', () => {
  const message = chatInput.value;
  if(message) {
    socket.emit('chat_message', { roomId, message });
    appendMessage('You', message);
    chatInput.value = '';
  }
});

socket.on('chat_message', (data) => {
  appendMessage('Other', data.message);
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<b>${sender}:</b> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

// Update the showVideoConference function to also show the chat
function showVideoConference() {
  roomSelectionContainer.style = "display: none";
  videoChatContainer.style = "display: block";
  chatContainer.style = "display: block"; // show chat container
}
//채팅코드 종료