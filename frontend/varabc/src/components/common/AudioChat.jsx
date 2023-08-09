import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

const socket = io.connect("https://localhost:4000");

const AudioChat = () => {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isRoomCreator, setIsRoomCreator] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const {room} = useParams();

  const remoteAudioElement = useRef(null);

  const mediaConstraints = {
    audio: {
      echoCancellation: false, // Enable echo cancellation
      noiseSuppression: true, // Enable noise suppression
      autoGainControl: true, // Enable automatic gain control
      sampleRate: 44100, // Set desired sample rate
    },
    video: false,
  };

  const rtcPeerConnection = useRef();
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
    ],
  };

  useEffect(()=>{
    const joinRoom = () => {
      if (room === "") {
        alert("Please type a room ID");
      } else {
        socket.emit("join", room);
      }
    };
    joinRoom();

  }, [])


  const handleLocalStream = async (mediaConstraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
      setLocalStream(stream);
    } catch (error) {
      console.error("Could not get user media", error);
    }
  };

  const setRemoteStreamCallback = (event) => {
    setRemoteStream(event.streams[0]); // Update the remoteStream state
  };

  const addLocalTracks = (rtcPeerConnection) => {
    localStream.getTracks().forEach((track) => {
      rtcPeerConnection.addTrack(track, localStream);
    });
  };

  const sendIceCandidate = (event) => {
    if (event.candidate) {
      socket.emit("webrtc_ice_candidate", {
        room,
        label: event.candidate.sdpMLineIndex,
        candidate: event.candidate.candidate,
      });
    }
  };

  const createOffer = async (rtcPeerConnection) => {
    let sessionDescription;
    try {
      sessionDescription = await rtcPeerConnection.createOffer();
      rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (error) {
      console.error(error);
    }

    console.log('offer emit room number', room)

    socket.emit("webrtc_offer", {
      type: "webrtc_offer",
      sdp: sessionDescription,
      roomId: room,
    });
  };

  const createAnswer = async (rtcPeerConnection) => {
    let sessionDescription;
    try {
      sessionDescription = await rtcPeerConnection.createAnswer();
      rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("room_joined", async () => {
      console.log("Socket event callback: room_joined");

      await handleLocalStream(mediaConstraints);
      console.log("room",room)
      console.log("localstream")
      socket.emit("start_call", room);
      console.log('start call emit')
    });

  }, [room])

  useEffect(() => {
    socket.on("start_call", async () => {
      console.log("Socket event callback: start_call");
      console.log('isRoomCreator', isRoomCreator)

      if (isRoomCreator) {
        rtcPeerConnection.current = new RTCPeerConnection(iceServers);
        addLocalTracks(rtcPeerConnection.current);
        rtcPeerConnection.current.ontrack = setRemoteStreamCallback;
        rtcPeerConnection.current.onicecandidate = sendIceCandidate;

        await createOffer(rtcPeerConnection.current);

      }
    });

  }, [isRoomCreator])

  useEffect(() => {
    socket.on("room_created", async () => {
      console.log("Socket event callback: room_created");

      await handleLocalStream(mediaConstraints);
      setIsRoomCreator(true);
    });



    socket.on("full_room", () => {
      console.log("Socket event callback: full_room");
      alert("The room is full, please try another one");
    });



    socket.on("webrtc_offer", async (event) => {
      console.log("Socket event callback: webrtc_offer");

      if (!isRoomCreator) {
        rtcPeerConnection.current = new RTCPeerConnection(iceServers);
        addLocalTracks(rtcPeerConnection.current);
        rtcPeerConnection.current.ontrack = setRemoteStreamCallback;
        rtcPeerConnection.current.onicecandidate = sendIceCandidate;
        rtcPeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(event)
        );
        await createAnswer(rtcPeerConnection.current);
      }
    });

    socket.on("webrtc_answer", (event) => {
      console.log("Socket event callback: webrtc_answer");
      rtcPeerConnection.current.setRemoteDescription(new RTCSessionDescription(event));
    });

    socket.on("webrtc_ice_candidate", (event) => {
      console.log("Socket event callback: webrtc_ice_candidate");

      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });

      rtcPeerConnection.current.addIceCandidate(candidate);
    });
  }, []);

  useEffect(() => {
    if (remoteAudioElement.current) {
      remoteAudioElement.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  const toggleMicrophone = async () => {
    setIsMicrophoneOn((prevState) => !prevState);

    // if (!isMicrophoneOn) {
    //   await startMicrophone();
    // } else {
    //   stopMicrophone();
    // }
  };

  // const startMicrophone = async () => {
  //   try {
  //     const localStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     });
  //     localStream
  //       .getTracks()
  //       .forEach((track) => peerConnection.addTrack(track, localStream));
  //   } catch (error) {
  //     console.error("Error capturing local audio stream:", error);
  //   }
  // };

  // const stopMicrophone = () => {
  //   peerConnection
  //     .getSenders()
  //     .filter((sender) => sender.track && sender.track.kind === "audio")
  //     .forEach((sender) => peerConnection.removeTrack(sender));
  // };

  return (
    <div>
      <h1>Audio Chat</h1>
      <div id="room-selection-container">
        {/* <label htmlFor="room-input">
          Enter the number of the room you want to connect
        </label>
        <input
          type="text"
          id="room-input"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button id="connect-button" onClick={joinRoom}>
          CONNECT
        </button> */}
      </div>

      <div id="video-chat-container" className="video-position">
        <button onClick={toggleMicrophone}>
          {isMicrophoneOn ? "Turn Off Microphone" : "Turn On Microphone"}
        </button>
        <audio
          id="remote-audio"
          autoPlay
          controls
          style={{ display: "block" }}
          ref={remoteAudioElement}
        ></audio>
      </div>
    </div>
  );
};

export default AudioChat;
