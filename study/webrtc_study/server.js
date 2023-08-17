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
    origin: "https://varabc.com", // 프론트엔드 도메인 설정
    credentials: true,
  },
});

app.use("/", express.static("public"));

// 방의 최대 인원수

io.on("connection", (socket) => {
  let maximum = 2;

  socket.on("join", (data) => {

    if (data.maxPlayers !== maximum) {
      maximum = data.maxPlayers
    }

    const roomClients = io.sockets.adapter.rooms.get(data.roomId);
    const numberOfClients = roomClients ? roomClients.size : 0;
    console.log("client 수", numberOfClients);

    if (numberOfClients !== 0) {
      if (numberOfClients === maximum) {
        console.log(
          `Can't join room ${data.roomId}, emitting full_room socket event`
        );
        socket.emit("room_full");
        return;
      }
      console.log(
        `Joining room ${data.roomId} and emitting room_joined socket event`
      );
    } else {
      console.log(
        `Creating room ${data.roomId} and emitting room_created socket event`
      );
    }

    socket.join(data.roomId);
    const allSocketIds = io.sockets.adapter.rooms.get(data.roomId);
    // Filter out the current socket's ID to get 'others'
    const otherSocketIds = [...allSocketIds].filter((id) => id !== socket.id);
    console.log('다른 유저 수', otherSocketIds.length)

    if (otherSocketIds.length) {
      console.log('emit all_users')
      // Depending on your use-case, you might emit socket IDs or some related user data
      io.sockets.to(socket.id).emit("all_users", otherSocketIds);
    }
  });

  // socket.on("start_call", (roomId) => {
  //   console.log(`Broadcasting start_call event to peers in room ${roomId}`);
  //   socket.broadcast.to(roomId).emit("start_call");
  // });

  socket.on("webrtc_offer", (sdp, roomId) => {
    console.log(
      `Broadcasting webrtc_offer event to peers in room ${roomId}`
    );
    socket.broadcast.to(roomId).emit("webrtc_offer", sdp);
  });

  socket.on("webrtc_answer", (sdp, roomId) => {
    console.log(
      `Broadcasting webrtc_answer event to peers in room ${roomId}`
    );
    socket.broadcast.to(roomId).emit("webrtc_answer", sdp);
  });

  socket.on("webrtc_ice_candidate", (data) => {
    console.log(
      `Broadcasting webrtc_ice_candidate event to peers in room ${data.roomId}`
    );
    socket.broadcast.to(data.roomId).emit("webrtc_ice_candidate", data);
  });

  socket.on("chat_message", (data) => {
    if (socket.rooms.has(data.roomId)) {
      // Broadcast to everyone else in the room (excluding the sender)
      socket.to(data.roomId).emit("chat_message", { message: data.message, username:data.username });
    }
  });

  // socket.on("leave_room", (data)=> {
  //   socket.leave(data.roomId)
  //   console.log("leave room event")
  //   const roomClients = io.sockets.adapter.rooms.get(data.roomId);
  //   const numberOfClients = roomClients ? roomClients.size : 0;
  //   socket.broadcast.to(data.roomId).emit("user_exit", { clientNumber: numberOfClients }); 
  // })

  socket.on("disconnect", () => {
    console.log('disconnect: ', socket.id)
  });

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
