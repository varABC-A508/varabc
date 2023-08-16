//firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// style
import './ide.css';

// npm
import {useState, useRef, useEffect} from "react";
import axios from 'axios';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ext-language_tools';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useSelector } from 'react-redux';
import socket from "../../modules/socketInstance";

// components
import IdeNav from './IdeNav';
import SmButton from '../common/Button/SmButton';
import { useNavigate, useParams } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBK1bjRO-tmrOEzfiyZQy3vSck5wi3Qjg4",
  authDomain: "varabc-d313b.firebaseapp.com",
  databaseURL: "https://varabc-d313b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "varabc-d313b",
  storageBucket: "varabc-d313b.appspot.com",
  messagingSenderId: "969662409747",
  appId: "1:969662409747:web:4d214eabe921e6a49263e6",
  measurementId: "G-2VXY01R153"
};

const app = initializeApp(firebaseConfig);

const Ide = ( { problemNo }) => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(null);
  const [memberNo, setMemberNo] = useState();

  const editorRef = useRef(null);

  const theme = useSelector((state) => state.ide.theme);
  const mode = useSelector((state) => state.ide.mode);
  const fontSize = useSelector((state) => state.ide.fontSize);

  const { roomToken, teamToken } = useParams();

  const userToken = localStorage.getItem('access-token');
  const teamMateNo = sessionStorage.getItem('teamMateNo');

  const navigate = useNavigate();

  useEffect(() => {
    if(!JSON.parse(sessionStorage.getItem('isPractice'))){
      const db = getDatabase(app);
      set(ref(db, `${roomToken}/${teamToken}/code`), {
        code: "",
      });
    }

    axios.get(`https://varabc.com:8080/member/getUserInfo`, {headers: {
        "access-token": userToken
      }}).then((res) => {
        setMemberNo(res.data.userInfo.memberNo);
        sessionStorage.setItem('memberNo', res.data.userInfo.memberNo);
      }).catch((err) => {
        alert("서버에 문제가 생겼습니다! 나중에 다시 시도해주세요!" + err);
        navigate("/");
      });

    if(!JSON.parse(sessionStorage.getItem('isPractice'))){
      socket.emit('onTimerStart', {
        roomToken: roomToken
      });
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isPlayerTurn', JSON.stringify(isPlayerTurn));
  }, [isPlayerTurn])

  socket.on('getPlayerTurn', ({ isPlayerTurn }) => {
    setIsPlayerTurn(isPlayerTurn);
  });

  socket.on('togglePlayerTurn', ({ isPlayerTurn })=> {
    setIsPlayerTurn(isPlayerTurn);
  });
  
  const onCodeChange = (newCode) => {
    if(!JSON.parse(sessionStorage.getItem('isPractice'))){
      const db = getDatabase(app);
      set(ref(db, `${roomToken}/${teamToken}/code`), {
        code: newCode,
      });
    }
    setCode(newCode);
  };

  const onCompileClick = (e)  => {
    e.preventDefault();
    axios.post(`https://varabc.com:8080/validation/compile${mode}`, {
      "memberNo": memberNo,
      "problemNo": problemNo,
      "code": code,
    }).then((res) => {
      setResult(res.data);
      alert("코드 전송 성공");
    }).catch((err) => {
      alert("코드 전송 실패\n" + err);
    });
  };

  const onPracticeSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://varabc.com:8080/validation/sendvalidate${mode}`, {
      "problemNo": problemNo,
      "memberNo": memberNo,
      "code": code
    }).then((res) => {
      setResult(res.data);
      if(parseInt(result.result) === 1){
        alert("문제 풀이 성공!");
        navigate('/');
      } else {
        alert("문제 풀이 실패!");
      }
    }).catch((err) => {
      alert("코드 전송 실패\n" + err);
    });
  }

  const onBattleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://varabc.com:8080/battle/submit/${roomToken}/${memberNo}`, {
      "battleCode": roomToken,
      "problemNo": problemNo,
      "member1": parseInt(memberNo),
      // TODO: 파트너 멤버 주기
      "member2": parseInt(teamMateNo),
      "team": parseInt(sessionStorage.getItem('teamNo')),
      "code": code,
      "language": mode
    }).then((res) => {
      console.log(res.data);
      setResult(res.data);
      if(parseInt(result.result) === 1) {
        alert("문제 풀이 성공");
        socket.emit('sendGameResult', {
          roomToken: roomToken,
          teamToken: teamToken
        });
      } else {
        alert("문제 풀이 실패");
      }
    }).catch(function (err){
      alert("코드 제출 실패\n" + err);
    });
  }

  useEffect(() => {
    if(!isPlayerTurn && !JSON.parse(sessionStorage.getItem('isPractice'))) {
      const db = getDatabase(app);
      const codeRef = ref(db, `${roomToken}/${teamToken}/code`);
      onValue(codeRef, (snapshot) => {
        const data = snapshot.val();
        setCode(data.code);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.resize();
    }
  }, [code]);
    
    return (
      <div className="w-full h-screen flex flex-col">
        <IdeNav />
        <PanelGroup direction='vertical' className="flex-grow">
          <Panel defaultSize={65}>
            <AceEditor
              mode={mode}
              placeholder="코드를 작성해주세요!"
              theme={theme}
              value={code}
              onChange={onCodeChange}
              fontSize={fontSize}
              readOnly={!isPlayerTurn && !JSON.parse(sessionStorage.getItem('isPractice'))}
              editorProps={{ $blockScrolling: false }}
              tabSize={2}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              style={{
                fontSize: `${fontSize}px`,
                width: "100%",
                height: "100%",
              }}
            />
          </Panel>
          <PanelResizeHandle className="cursor-row-resize bg-primaryDark" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={25} className="bg-primary text-white">
            <div>실행 결과</div>
            <div>실행 시간: {result.executionTime}</div>
            <div>사용 메모리: {result.memoryUsage}</div>
            { <div>{(result && !result.result) ? (result.result === 1 ? "성공" : "실패") : ("")}</div> }
            { <div>{(result && !result.exceptionMessage) ? result.exceptionMessage : ""}</div> }
            <br />
            { result.output ? result.output.map((outputMessage, index) => (<div key={index}>{`테스트 ${index + 1}:    ${outputMessage}`}</div>)) : ""}
          </Panel>
          <PanelResizeHandle className="cursor-row-resize bg-primaryDark" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={10} className="bg-primary">
            <SmButton bgColor="basic" text="실행하기" onClick={onCompileClick} />
            <SmButton bgColor="green" text="제출하기" onClick={(JSON.parse(sessionStorage.getItem('isPractice'))) ? onPracticeSubmit : onBattleSubmit} />
          </Panel>
        </PanelGroup>
      </div>
    );
};

export default Ide;