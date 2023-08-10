import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const AudioChat = () => {
  const socketRef = useRef();
  const myAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const pcRef = useRef();

  const { roomId } = useParams();

  const [localStream, setLocalStream] = useState(null);
  const [micEnabled, setMicEnabled] = useState(false);

  const toggleMicrophone = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setMicEnabled(track.enabled);
      });
    }
  };

  const getMedia = async () => {
    const mediaConstraints = {
      audio: {
        echoCancellation: false, // Enable echo cancellation
        noiseSuppression: true, // Enable noise suppression
        autoGainControl: true, // Enable automatic gain control
        sampleRate: 44100, // Set desired sample rate
      },
      video: false,
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );

      stream.getAudioTracks().forEach((track) => (track.enabled = false));
      setLocalStream(stream);

      if (myAudioRef.current) {
        myAudioRef.current.srcObject = stream;
      }

      if (!(pcRef.current && socketRef.current)) {
        return;
      }

      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });
      console.log("addtrack");

      pcRef.current.onicecandidate = (e) => {
        console.log(e);
        if (e.candidate) {
          console.log("e.candidate true?");
          if (!socketRef.current) {
            console.log("no socket ref");
            return;
          }
          console.log("recv candidate");
          socketRef.current.emit("webrtc_ice_candidate", {
            roomId,
            label: e.candidate.sdpMLineIndex,
            candidate: e.candidate.candidate,
            sdpMid: e.candidate.sdpMid,
          });
        }
        console.log("no candidate");
      };

      console.log("added onicecandidate");

      pcRef.current.ontrack = (e) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = e.streams[0];
        }
      };

      console.log("ontrack");
    } catch (e) {
      console.log(e);
    }
  };

  const createOffer = async () => {
    console.log("create offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socketRef.current.emit("webrtc_offer", sdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp) => {
    console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socketRef.current.emit("webrtc_answer", answerSdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const webrtc = async () => {
      socketRef.current = io.connect("https://localhost:4000");

      pcRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          // { urls: "stun:stun1.l.google.com:19302" },
          // { urls: "stun:stun2.l.google.com:19302" },
          // { urls: "stun:stun3.l.google.com:19302" },
          // { urls: "stun:stun4.l.google.com:19302" },
        ],
      });

      socketRef.current.on("all_users", (allUsers) => {
        if (allUsers.length > 0) {
          createOffer();
        }
      });

      socketRef.current.on("webrtc_offer", (sdp) => {
        console.log("recv Offer");
        createAnswer(sdp);
      });

      socketRef.current.on("webrtc_answer", (sdp) => {
        console.log("recv Answer");
        if (!pcRef.current) {
          return;
        }
        pcRef.current.setRemoteDescription(sdp);
      });

      socketRef.current.on("webrtc_ice_candidate", async (candidate) => {
        if (!pcRef.current) {
          return;
        }
        await pcRef.current.addIceCandidate(candidate);
      });

      await getMedia();

      socketRef.current.emit("join", {
        room: roomId,
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }

        if (pcRef.current) {
          pcRef.current.close();
        }
      };
    };

    webrtc();
  }, []);

  return (
    <div className="m-3">
      <audio ref={remoteAudioRef} autoPlay controls className="m-3"></audio>
      <button onClick={toggleMicrophone} className="m-3 p-1 border border-black">
        {micEnabled ? "마이크끄기" : "마이크켜기"}
      </button>
    </div>
  );
};

export default AudioChat;
