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

const baseURL = 'https://varabc.com:8080/validation/sendvalidate';
const subURL = {
  "java" : "java",
  "python": "py",
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

  const { roomToken, TeamNo } = useParams();

  const userToken = sessionStorage.getItem('access-token');

  const navigate = useNavigate();

  useEffect(() => {
    console.log("사용자 토큰: " + userToken);
    axios.get(`https://varabc.com:8080/member/getUserInfo`, {headers: {
        "access-token": userToken
      }}).then((res) => {
        setMemberNo(res.data.userInfo.memberNo);
        sessionStorage.setItem('memberNo', memberNo);
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
    const db = getDatabase(app);
    set(ref(db, `${roomToken}/${TeamNo}/code`), {
      code: newCode
    });
    setCode(newCode);
  };

  const onCompileClick = (e)  => {
    e.preventDefault();
    axios.post("https://varabc.com:8080/validation/compilePython", {
      "memberNo": memberNo,
      "problemNo": problemNo,
      "code": code,
    }).then((res) => {
      setResult(res.data);
      alert("코드 전송 성공");
    }).catch(function (err){
      alert("코드 전송 실패\n" + err);
    });
  };

  const onRunClick = (e) => {
    e.preventDefault();
    axios.post(baseURL + subURL[mode], {
      "problemNo": problemNo,
      "memberNo": memberNo,
      "code": code,
    }).then((res) => {
      setResult(res.data);
      // TODO: 결과가 1일시 결과창 이동 넣기
      if(result.result === 1) navigate('/');
      alert("코드 전송 성공");
    }).catch(function (err){
      alert("코드 전송 실패\n" + err);
    });
  };


  useEffect(() => {
    if(!isPlayerTurn && !JSON.parse(sessionStorage.getItem('isPractice'))) {
      const db = getDatabase(app);
      const codeRef = ref(db, `${roomToken}/${TeamNo}/code`);
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
            <div>{result.result === 1 ? "성공" : "실패"}</div>
            { result.output ? (<div>output : {result.output} </div>): <div>제출 되었습니다.</div>}
          </Panel>
          <PanelResizeHandle className="cursor-row-resize bg-primaryDark" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={10} className="bg-primary">
            <SmButton bgColor="basic" text="실행하기" onClick={onCompileClick} />
            <SmButton bgColor="green" text="제출하기" onClick={onRunClick} />
          </Panel>
        </PanelGroup>
      </div>
    );
};

export default Ide;