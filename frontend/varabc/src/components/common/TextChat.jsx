import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import swal from "sweetalert";

const TextChat = ({ roomId }) => {
  const socketRef = useRef();
  const chatRoomRef = useRef();
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const username = 'username';

  const handleClick = () => {
    if (message.trim()) {
      socketRef.current.emit("chat_message", { roomId, username, message });
      setAllMessages((prevMessages)=>[...prevMessages, {username, message}])
      setMessage("");
    }
  };

  const ChatRoom = allMessages.map(({ username, message }, index) => (
      <div key={index}>
        <h3>
          {username}:<span>{message}</span>
        </h3>
      </div>
    ));


  useEffect(() => {
    // Automatically scroll to the bottom of the div when new content is added
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [chatRoomRef]);

  useEffect(() => {
    socketRef.current = io.connect("https://localhost:4000");

    socketRef.current.on("room_full", () => {
      // console.log("Socket event callback: room full");
      swal("이런", "방이 이미 모두 찼어요! 다른 방을 찾아주세요", "error");
    });

    socketRef.current.on("chat_message", (data) => {
      const newMessage = {username:data.username, message:data.message}
      setAllMessages((prevMessages)=>[...prevMessages,newMessage])
    });

    // socketRef.current.on("user_exit", (data) => {
    //   console.log(`유저 퇴장, 현재 ${data.clientNumber}명`)
    // })

    socketRef.current.emit("join", {
      room: roomId,
      maxPlayers: 4,
    });
    
    return () => {
      // socketRef.current.emit("leave_room", {roomId})

      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div id="chatContainer" className="h-[220px]">
      <div id="chatRoom" ref={chatRoomRef} className="w-300 h-[180px] overflow-y-scroll bg-neutral-200">{ChatRoom}</div>
      <div className="w-300 h-[30px] flex">
        <textarea
          id="chatInput"
          className="w-[80%] h-[30px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button id="sendMessage" onClick={handleClick} className="w-[20%] h-[30px] bg-neutral-100">
          보내기
        </button>
      </div>
    </div>
  );
};

export default TextChat;