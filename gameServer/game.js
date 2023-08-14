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
    origin: 'https://varabc.com',// 프론트엔드 도메인 설정
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
// const io = require("socket.io")(server);

const MAX_PLAYERS = 4;

const rooms = {};

io.on("connection", (socket) => {
  sendLogToClients(`소켓 아이디: ${socket.id} 유저가 접속했습니다`);
  socket.on('createWaitingRoom', ({ roomToken, memberNo }) => {
    const room = roomToken;
    socket.join(room);
    rooms[room] = {
      creator: memberNo,
      members: [],
    }; // 방장은 항상 1번
    sendLogToClients(`방 토큰: ${room} 인 게임방이 생성되었습니다!`);
    sendLogToClients(`방장의 No: ${memberNo}`);
  });

  socket.on('joinWaitingRoom', ({ roomToken, member }) => {
    const room = roomToken;
    if (rooms[room] && rooms[room].members.length < MAX_PLAYERS) {
      // 방 참가 로직
      if(member.memberNo != rooms[room].creator){
        socket.join(room);
      }
      const nextNumber = rooms[room].members.length + 1;
      rooms[room].members.push({ userRoomIndex: nextNumber, member: member, socketId: socket.id});
      sendLogToClients(`${member.memberNickname}가 방${room}에 참가했습니다!\n사용자No: ${member.memberNo} 순번: ${nextNumber}`);
      io.to(room).emit('updateWaitingRoom', { currMembers: rooms[room].members });
    } else {
      sendLogToClients(`방에 더 이상 참가할 수 없습니다: ${room}`);
    }
  });

  socket.on('onGameStart', ({roomToken, url1, url2}) => {
    sendLogToClients(roomToken +" 방의 게임을 시작합니다!");
    const room = roomToken;
    for(const player of rooms[room].members){
      if(player.userRoomIndex == 1 || player.userRoomIndex == 2){
        sendLogToClients(player.member.memberNickname +"에게 1번 url 전송");
        io.to(player.socketId).emit('getTeamUrl', { url: url1 });
      } else {
        sendLogToClients(player.member.memberNickname +"에게 2번 url 전송");
        io.to(player.socketId).emit('getTeamUrl', { url: url2 });
      }
    }
  });

  socket.on('onTimerStart', ({roomToken}) => {
    const room = roomToken;
    for(const member of rooms[room].members){
      if(member.userRoomIndex == 1 || member.userRoomIndex == 3){
        io.to(member.socketId).emit('getPlayerTurn', {isPlayerTurn: true});
      } else {
        io.to(member.socketId).emit('getPlayerTurn', {isPlayerTurn: false});
      }
    }
  });

  socket.on('onTimerEnd', ({ isPlayerTurn }) => {
    io.to(socket.id).emit('togglePlayerTurn', {isPlayerTurn: !isPlayerTurn});
  });

  socket.on('disconnect', () => {
    let isFoundUser = false;
    for (const room in rooms) {
      for(const member of rooms[room].members){
        if(member.socketId === socket.id){
          rooms[room].members = rooms[room].members.filter(member => member !== socket.id);
          socket.leave(room);
          io.to(room).emit('updateWaitingRoom', {currMembers: rooms[room].members});
          isFoundUser = true;
          if (rooms[room].members.length === 0) {
            delete rooms[room]; // 방에 더 이상 사용자가 없으면 방을 삭제
            console.log(`방이 비어서 삭제되었습니다: ${room}`);
          }
          break;
        }
      }
      if(isFoundUser)
        break;
    }
  });
}); 

const sendLogToClients = (message) => {
  io.emit('logMessage', message);
};

server.listen(3001, () => {
  console.log(`Express server listening on port 3001`);
});
