import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import swal from "sweetalert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const AudioChat = ({ roomId }) => {
  const socketRef = useRef();
  const myAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const pcRef = useRef();

  // const { roomId } = useParams();

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
        echoCancellation: true, // Enable echo cancellation
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

      pcRef.current.onicecandidate = (e) => {
        console.log(e);
        if (e.candidate) {
          // console.log("e.candidate true?");
          if (!socketRef.current) {
            // console.log("no socket ref");
            return;
          }
          // console.log("recv candidate");
          socketRef.current.emit("webrtc_ice_candidate", {
            roomId,
            label: e.candidate.sdpMLineIndex,
            candidate: e.candidate.candidate,
            sdpMid: e.candidate.sdpMid,
          });
        }
        // console.log("no candidate");
      };

      // console.log("added onicecandidate");

      pcRef.current.ontrack = (e) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = e.streams[0];
        }
      };

      // console.log("ontrack");
    } catch (e) {
      console.log(e);
    }
  };

  const createOffer = async () => {
    // console.log("create offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      // console.log("sent the offer");
      socketRef.current.emit("webrtc_offer", sdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp) => {
    // console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      // console.log("sent the answer");
      socketRef.current.emit("webrtc_answer", answerSdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const webrtc = async () => {
      socketRef.current = io.connect("https://varabc.com:3000");

      pcRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          // { urls: "stun:stun1.l.google.com:19302" },
          // { urls: "stun:stun2.l.google.com:19302" },
          // { urls: "stun:stun3.l.google.com:19302" },
          // { urls: "stun:stun4.l.google.com:19302" },
        ],
      });

      socketRef.current.on("room_full", () => {
        // console.log("Socket event callback: full_room");
        swal("이런", "방이 이미 모두 찼어요! 다른 방을 찾아주세요", "error");
      });

      socketRef.current.on("all_users", (allUsers) => {
        if (allUsers.length > 0) {
          createOffer();
        }
      });

      socketRef.current.on("webrtc_offer", (sdp) => {
        // console.log("recv Offer");
        createAnswer(sdp);
      });

      socketRef.current.on("webrtc_answer", (sdp) => {
        // console.log("recv Answer");
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

      // socketRef.current.on("user_exit", (data) => {
      //   console.log(`유저 퇴장, 현재 ${data.clientNumber}명`)
      // })

      await getMedia();

      socketRef.current.emit("join", {
        roomId: roomId,
        maxPlayers: 2,
      });
    };

    webrtc();

    return () => {
      // 브라우저 닫을 때는 실행 안 됨 
      // socketRef.current.emit("leave_room", {roomId})

      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      if (pcRef.current) {
        pcRef.current.close();
      }
    };

  // eslint-disable-next-line
  }, []);

  return (
    <div>
      <audio ref={remoteAudioRef} autoPlay controls className="hidden"></audio>
      <button onClick={toggleMicrophone}>
        {micEnabled ? (
          <FontAwesomeIcon className="ml-4 text-white" icon={faMicrophone} />
        ) : (
          <FontAwesomeIcon
            className="ml-4 text-white"
            icon={faMicrophoneSlash}
          />
        )}
      </button>
    </div>
  );
};

export default AudioChat;
