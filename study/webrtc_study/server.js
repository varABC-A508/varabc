const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const server = https.createServer(
  {
    key: fs.readFileSync("ssl/privkey.pem"),
    cert: fs.readFileSync("ssl/cert.pem"),
  },
  app
);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // 프론트엔드 도메인 설정
    methods: ["GET", "POST"],
    credentials:true,
  },
});


app.use("/", express.static("public"));

io.on("connection", (socket) => {
  socket.on("join", (roomId) => {
    const roomClients = io.sockets.adapter.rooms.get(roomId); 
    const numberOfClients = roomClients ? roomClients.size : 0; 
    console.log(numberOfClients);

    if (numberOfClients == 0) {
      console.log(
        `Creating room ${roomId} and emitting room_created socket event`
      );
      socket.join(roomId);
      socket.emit("room_created", roomId);
    } else if (numberOfClients == 1) {
      console.log(
        `Joining room ${roomId} and emitting room_joined socket event`
      );
      socket.join(roomId);
      socket.emit("room_joined", roomId);
    } else {
      console.log(`Can't join room ${roomId}, emitting full_room socket event`);
      socket.emit("full_room", roomId);
    }
  });

  socket.on("start_call", (roomId) => {
    console.log(`Broadcasting start_call event to peers in room ${roomId}`);
    socket.broadcast.to(roomId).emit("start_call");
  });

  socket.on("webrtc_offer", (event) => {
    console.log(
      `Broadcasting webrtc_offer event to peers in room ${event.roomId}`
    );
    socket.broadcast.to(event.roomId).emit("webrtc_offer", event.sdp);
  });

  socket.on("webrtc_answer", (event) => {
    console.log(
      `Broadcasting webrtc_answer event to peers in room ${event.roomId}`
    );
    socket.broadcast.to(event.roomId).emit("webrtc_answer", event.sdp);
  });

  socket.on("webrtc_ice_candidate", (event) => {
    console.log(
      `Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`
    );
    socket.broadcast.to(event.roomId).emit("webrtc_ice_candidate", event);
  });

  socket.on('chat_message', (data) => {
    // Broadcast to everyone else in the room (excluding the sender)
    socket.to(data.roomId).emit('chat_message', { message: data.message });
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
