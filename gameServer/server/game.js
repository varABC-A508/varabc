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
    origin: '*',// 프론트엔드 도메인 설정
    credentials: true,
  },
});

const MAX_PLAYERS = 4;

const rooms = {};

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  socket.on('createWaitingRoom', ({ roomToken, memberNo }) => {
    const room = roomToken;
    socket.join(room);
    rooms[room] = {
      creator: memberNo,
      members: [],
    }; // 방장은 항상 1번
    console.log(`새로운 방 생성: ${room}`);
    console.log(`방장의 No: ${memberNo}`);
    socket.disconnect(true);
  });

  socket.on('joinWaitingRoom', ({ roomToken, member }) => {
    const room = roomToken;
    if (rooms[room] && rooms[room].members.length < MAX_PLAYERS) {
      // 방 참가 로직
      socket.join(room);
      const nextNumber = rooms[room].members.length + 1;
      rooms[room].members.push({ userRoomIndex: nextNumber, member: member, socketId: socket.id});
      console.log(`사용자가 방에 참가했습니다!\n 방: ${room}\n 사용자No: ${member.memberNo} 순번: ${nextNumber}`);
      console.log(rooms[room].members[nextNumber - 1].member.memberNickname);
      io.to(room).emit('updateWaitingRoom', {currMembers: rooms[room].members, userRoomIndex: nextNumber});
    } else {
      console.log(`방에 더 이상 참가할 수 없습니다: ${room}`);
    }
  });

  socket.on('onGameStart', ({roomToken, url1, url2}) => {
    console.log(roomToken +" 방의 게임을 시작합니다!");
    const room = roomToken;
    console.log('url1:' + url1);
    console.log('url2:' + url2);
    io.to(room).emit('startGame', { 
      url1: url1, 
      url2: url2,
    });
  });

  socket.on('onTimerStart', ({roomToken}) => {
    const room = roomToken;
    for(const member in rooms[room].members){
      if(member.userRoomIndex === 0 || member.userRoomIndex === 2){
        io.to(member.socketId).emit('getPlayerTurn', {isPlayerTurn: true});
      } else {
        io.to(member.socketId).emit('getPlayerTurn', {isPlayerTurn: false});
      }
    }
  });

  socket.on('onTimerEnd', ({isPlayerTurn, roomToken}) => {
    const room = roomToken;
    io.to(room).emit('togglePlayerTurn', {isPlayerTurn: !isPlayerTurn});
  });

  socket.on('disconnect', () => {
    for (const room in rooms) {
      if (rooms[room].members.includes(socket.id)) {
        rooms[room].members = rooms[room].members.filter(member => member !== socket.id);
        console.log(`사용자가 방을 나갔습니다: ${room}`);
        if (rooms[room].members.length === 0) {
          delete rooms[room]; // 방에 더 이상 사용자가 없으면 방을 삭제
          console.log(`방이 비어서 삭제되었습니다: ${room}`);
        }
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log(`Express server listening on port 3001`);
});
