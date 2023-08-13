import {io} from 'socket.io-client';
const socket = io('https://varabc.com:3001', {
  reconnection: true, // 자동 재연결 활성화
  reconnectionAttempts: 5, // 최대 5번 재연결 시도
  reconnectionDelay: 1000, // 1초마다 재연결 시도
  reconnectionDelayMax: 5000, // 최대 5초의 재연결 간격
  forceNew: false,
  rejectUnauthorized: false
});
export default socket;