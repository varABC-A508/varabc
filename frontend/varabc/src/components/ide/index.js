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

// components
import IdeNav from './IdeNav';
import SmButton from '../common/Button/SmButton';

// axios.defaults.baseURL = 'http://43.200.245.232:8080/validation/sendvalidatepy';
// axios.defaults.withCredentials = true;

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

const Ide = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  
  const editorRef = useRef(null);
  
  const onCodeChange = (newCode) => {
    const db = getDatabase(app);
    set(ref(db, 'room1/code'), {
      code: code
    });
    setCode(newCode);
  };

  const theme = useSelector((state) => state.ide.theme);
  const mode = useSelector((state) => state.ide.mode);
  const fontSize = useSelector((state) => state.ide.fontSize);
  const isIdeShown = useSelector((state) => state.ide.isIdeShown);

  const onRunClick = (e) => {
    e.preventDefault();
    axios.post("http://43.200.245.232:8080/validation/sendvalidatepy", {
      "problemNo": 60,
      "memberNo": 123,
      "code": code,
    }).then((res) => {
      console.log(res);
      setResult(res.data);
      alert("코드 전송 성공");
    }).catch(function (err){
      alert("코드 전송 실패\n" + err);
    });
  };

  const receiveCode = () => {
    const db = getDatabase(app);
    const codeRef = ref(db, 'room1/code');
    onValue(codeRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      return data.code;
    });
  }

  useEffect(() => {
    // Code가 변경될 때마다 Ace Editor의 높이를 조정합니다.
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.resize(); // Ace Editor의 크기를 조정하여 스크롤이 제대로 동작하도록 합니다.
    }
  }, [code]);
    
    return (
      <div className="w-full h-full flex flex-col">
        <IdeNav />
        <PanelGroup direction='vertical' className="flex-grow">
          <Panel defaultSize={65}>
            { isIdeShown ? <AceEditor
              mode={mode}
              placeholder="코드를 작성해주세요!"
              theme={theme}
              value={code}
              onChange={onCodeChange}
              fontSize={fontSize}
              editorProps={{ $blockScrolling: false }}
              tabSize={2}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              style={{
                fontSize: `${fontSize}px`,
                width: "100%",
                height: "100%",
              }}
            /> : <AceEditor
            mode={mode}
            theme={theme}
            readOnly={true}
            fontSize={fontSize}
            editorProps={{ $blockScrolling: false }}
            tabSize={2}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            style={{
              fontSize: `${fontSize}px`,
              width: "100%",
              height: "100%",
            }}
          />}
          </Panel>
          <PanelResizeHandle className="cursor-row-resize" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={25}>
            <div>실행 결과</div>
            <div>실행 시간: {result.executionTime}</div>
            <div>사용 메모리: {result.memoryUsage}</div>
            <div>{result.result ? "성공" : "실패"}</div>
          </Panel>
          <PanelResizeHandle className="cursor-row-resize" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={10}>
            <SmButton bgColor="basic" text="실행하기" onClick={onRunClick} />
            <SmButton bgColor="green" text="제출하기" onClick={onRunClick} />
            <SmButton bgColor="green" text="firebaseTest" onClick={receiveCode} />
          </Panel>
        </PanelGroup>
      </div>
    );
};

export default Ide;