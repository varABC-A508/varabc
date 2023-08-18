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
      team1: "",
      team2: ""
    };
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
      io.to(socket.id).emit('getUserRoomIndex', { userRoomIndex: nextNumber });
      io.to(room).emit('updateWaitingRoom', { currMembers: rooms[room].members });
    } else {
      sendLogToClients(`방에 더 이상 참가할 수 없습니다: ${room}`);
    }
  });

  socket.on('onGameStart', ({roomToken, url1, url2, teamToken1, teamToken2}) => {
    sendLogToClients(roomToken +" 방의 게임을 시작합니다!");
    const room = roomToken;
    rooms[room].team1 = teamToken1;
    rooms[room].team2 = teamToken2;
    for(const player of rooms[room].members){
      let teamMateNo;
      if(player.userRoomIndex == 1 || player.userRoomIndex == 2){
        sendLogToClients(player.member.memberNickname +"에게 1번 url 전송");
        if(player.userRoomIndex == 1){
          teamMateNo = rooms[room].members[1].member.memberNo;
        } else {
          teamMateNo = rooms[room].members[0].member.memberNo;
        }
        io.to(player.socketId).emit('getTeamUrl', { url: url1, teamNo: 1, teamMateNo: teamMateNo });
      } else {
        if(player.userRoomIndex == 3){
          teamMateNo = rooms[room].members[3].member.memberNo;
        } else {
          teamMateNo = rooms[room].members[2].member.memberNo;
        }
        sendLogToClients(player.member.memberNickname +"에게 2번 url 전송");
        io.to(player.socketId).emit('getTeamUrl', { url: url2, teamNo: 2, teamMateNo: teamMateNo });
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

  socket.on('sendGameResult', ({ roomToken, teamToken }) => {
    const room = roomToken;
    let win = [];
    let lose = [];
    let winTeamNo;
    let loseTeamNo;
    const team1 = rooms[room].team1;
    const team2 = rooms[room].team2;
    if (team1 === teamToken) {
      winTeamNo = 1;
      loseTeamNo = 2;
      win = rooms[room].members.slice(0, 2);
      lose = rooms[room].members.slice(2);
    } else if (team2 === teamToken) {
      winTeamNo = 2;
      loseTeamNo = 1;
      win = rooms[room].members.slice(2);
      lose = rooms[room].members.slice(0, 2);
    }
    const memberNos = rooms[room].members.map((player) => parseInt(player.member.memberNo));
    const gameResult = {
      winTeam: win,
      loseTeam: lose,
      winTeamNo: winTeamNo,
      loseTeamNo: loseTeamNo,
      memberNos: memberNos,
      winTeamToken: teamToken
    }
    io.to(room).emit('showGameResult', { gameResult });
  });

  socket.on('getTeamMateInfo', ({ roomToken, teamMateIndex }) => {
    const room = roomToken;
    io.to(socket.id).emit('sendTeamMateInfo', { teamMateInfo: rooms[room].members[teamMateIndex - 1] });
  });

  socket.on('onGameEnd', ({ roomToken }) => {
    const room = roomToken;
    io.to(socket.id).emit('endGame');
    socket.leave(room);
  });

  socket.on('gameLeave', ({ roomToken }) => {
    const room = roomToken;
    for(const member of rooms[room].members){
      if(member.socketId === socket.id){
        rooms[room].members = rooms[room].members.filter(member => member.socketId !== socket.id);
        socket.leave(room);
        io.to(room).emit('updateWaitingRoom', {currMembers: rooms[room].members});
        if (rooms[room].members.length === 0) {
          delete rooms[room]; // 방에 더 이상 사용자가 없으면 방을 삭제
          console.log(`방이 비어서 삭제되었습니다: ${room}`);
        }
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    let isFoundUser = false;
    for (const room in rooms) {
      for(const member of rooms[room].members){
        if(member.socketId === socket.id){
          rooms[room].members = rooms[room].members.filter(member => member.socketId !== socket.id);
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
