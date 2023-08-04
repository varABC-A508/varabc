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

const Ide = () => {
  const [code, setCode] = useState('');

  const editorRef = useRef(null);

  const onCodeChange = (newCode) => setCode(newCode);

  const theme = useSelector((state) => state.ide.theme);
  const mode = useSelector((state) => state.ide.mode);
  const fontSize = useSelector((state) => state.ide.fontSize);
  const isIdeShown = useSelector((state) => state.ide.isIdeShown);

  const onRunClick = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080", {
      "problemNo": 35,
      "code": {code},
      "timeLimit": "20000",
      "memoryLimit": "256000000"
    }).then((res) => {
      alert("코드 전송 성공");
    }).catch(function (err){
      alert("코드 전송 실패\n" + err);
    });
  };

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
            /> : <div>WebRTC로 다른 사람의 IDE 보여주기</div>}
          </Panel>
          <PanelResizeHandle className="cursor-row-resize" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={25}>
            <div>실행 결과</div>
          </Panel>
          <PanelResizeHandle className="cursor-row-resize" style={{ height: '4px', backgroundColor: 'gray' }} />
          <Panel defaultSize={10}>
            <SmButton bgColor="basic" text="실행하기" onClick={onRunClick} />
            <SmButton bgColor="green" text="제출하기" onClick={onRunClick} />
          </Panel>
        </PanelGroup>
      </div>
    );
};

export default Ide;