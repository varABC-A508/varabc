//firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// style
import "./ide.css";
import swal from "sweetalert";

// npm
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../modules/socketInstance";

// components
import IdeNav from "./IdeNav";
import SmButton from "../common/Button/SmButton";
import { useNavigate, useParams } from "react-router-dom";
import { setIsPlayerTurn } from "../../redux/Reducer/ideReducers";

const firebaseConfig = {
  apiKey: "AIzaSyBK1bjRO-tmrOEzfiyZQy3vSck5wi3Qjg4",
  authDomain: "varabc-d313b.firebaseapp.com",
  databaseURL:
    "https://varabc-d313b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "varabc-d313b",
  storageBucket: "varabc-d313b.appspot.com",
  messagingSenderId: "969662409747",
  appId: "1:969662409747:web:4d214eabe921e6a49263e6",
  measurementId: "G-2VXY01R153",
};

const app = initializeApp(firebaseConfig);

const Ide = ({ problemNo }) => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const isPlayerTurn = useSelector((state) => state.ide.isPlayerTurn);
  const [memberNo, setMemberNo] = useState();

  const editorRef = useRef(null);

  const theme = useSelector((state) => state.ide.theme);
  const mode = useSelector((state) => state.ide.mode);
  const fontSize = useSelector((state) => state.ide.fontSize);

  const { roomToken, teamToken } = useParams();

  const userToken = localStorage.getItem("access-token");
  const teamMateNo = sessionStorage.getItem("teamMateNo");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.setItem("team-token", teamToken);
    if (!JSON.parse(sessionStorage.getItem("isPractice"))) {
      const db = getDatabase(app);
      set(ref(db, `${roomToken}/${teamToken}/code`), {
        code: "",
      });
    }

    axios
      .get(`https://varabc.com:8080/member/getUserInfo`, {
        headers: {
          "access-token": userToken,
        },
      })
      .then((res) => {
        setMemberNo(res.data.userInfo.memberNo);
        sessionStorage.setItem("memberNo", res.data.userInfo.memberNo);
      })
      .catch((err) => {
        swal("이런", "로그인 후 사용해 주세요!" + err, "error");
        navigate("/");
      });

    if (!JSON.parse(sessionStorage.getItem("isPractice"))) {
      socket.emit("onTimerStart", {
        roomToken: roomToken,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage.setItem("isPlayerTurn", JSON.stringify(isPlayerTurn));
  }, [isPlayerTurn]);

  socket.on("getPlayerTurn", ({ isPlayerTurn }) => {
    dispatch(setIsPlayerTurn(isPlayerTurn));
    sessionStorage.setItem("isPlayerTurn", JSON.stringify(isPlayerTurn));
  });

  socket.on("togglePlayerTurn", ({ isPlayerTurn }) => {
    dispatch(setIsPlayerTurn(isPlayerTurn));
    sessionStorage.setItem("isPlayerTurn", JSON.stringify(isPlayerTurn));
  });

  const onCodeChange = (newCode) => {
    if (!JSON.parse(sessionStorage.getItem("isPractice"))) {
      const db = getDatabase(app);
      set(ref(db, `${roomToken}/${teamToken}/code`), {
        code: newCode,
      });
    }
    setCode(newCode);
  };

  const submitStatusMap = {
    1: "컴파일 성공",
    2: "시간 초과",
    3: "메모리 초과",
    4: "컴파일 실패",
  };

  const onCompileClick = (e) => {
    e.preventDefault();
    axios
      .post(`https://varabc.com:8080/validation/compile${mode}`, {
        memberNo: memberNo,
        problemNo: problemNo,
        code: code,
      })
      .then((res) => {
        setResult(res.data);
        swal("코드 전송 성공!", "코드 전송에 성공했습니다! :)", "success");
      })
      .catch((err) => {
        swal("코드 전송 실패!", "코드 전송에 실패했습니다! :(" + err, "error");
      });
  };

  const onPracticeSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://varabc.com:8080/validation/sendvalidate${mode}`, {
        problemNo: problemNo,
        memberNo: memberNo,
        code: code,
      })
      .then((res) => {
        // console.log(res)
        setResult(res.data);
        if (parseInt(res.data.result) === 1) {
          swal("와", "문제 풀이 성공!", "success");
          navigate("/");
        } else {
          swal("이런", "문제 풀이 실패!", "error");
        }
      })
      .catch((err) => {
        swal("이런", "코드 전송 실패!>13" + err, "error");
      });
  };

  const onBattleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://varabc.com:8080/battle/submit/${roomToken}/${memberNo}`, {
        battleCode: roomToken,
        problemNo: parseInt(problemNo),
        member1: parseInt(memberNo),
        // TODO: 파트너 멤버 주기
        member2: parseInt(teamMateNo),
        team: parseInt(sessionStorage.getItem("teamNo")),
        code: code,
        language: mode.toLowerCase(),
      })
      .then((res) => {
        setResult(res.data);
        if (parseInt(res.data.result) === 1) {
          swal("와", "문제 풀이 성공!", "success");
          socket.emit("sendGameResult", {
            roomToken: roomToken,
            teamToken: teamToken,
          });
        } else {
          swal("이런", "문제 풀이 실패!", "error");
        }
      })
      .catch(function (err) {
        swal("이런", "코드 제출 실패!" + err, "error");
      });
  };

  socket.on("showGameResult", ({ gameResult }) => {
    navigate(`/battle/${roomToken}/result1`, {
      state: {
        gameResult,
      },
    });
  });

  useEffect(() => {
    if (!isPlayerTurn && !JSON.parse(sessionStorage.getItem("isPractice"))) {
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
      <IdeNav token={`${roomToken}${teamToken}`} />
      <PanelGroup direction="vertical" className="flex-grow">
        <Panel defaultSize={65}>
          <AceEditor
            className="editor"
            mode={mode.toLowerCase()}
            placeholder="코드를 작성해주세요!"
            theme={theme}
            value={code}
            onChange={onCodeChange}
            fontSize={fontSize}
            readOnly={
              !isPlayerTurn && !JSON.parse(sessionStorage.getItem("isPractice"))
            }
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
        <PanelResizeHandle
          className="cursor-row-resize bg-primaryDark"
          style={{ height: "4px", backgroundColor: "gray" }}
        />
        <Panel defaultSize={25} className="bg-primary text-white">
          <div>실행 결과: {submitStatusMap[result.result]}</div>
          <div>실행 시간: {result.executionTime}ms</div>
          <div>사용 메모리: {result.memoryUsage}KB</div>
          {
            <div>
              {result && !result.result
                ? result.result === 1
                  ? "성공"
                  : "실패"
                : ""}
            </div>
          }
          {
            <div>
              {result && !result.exceptionMessage
                ? result.exceptionMessage
                : ""}
            </div>
          }
          <br />
          {result.output
            ? result.output.map((outputMessage, index) => {
                return (
                  <div key={index} className="flex">
                    <div className="me-2">{`테스트 ${index + 1}:`}</div>
                    <div className="flex flex-col">
                      {outputMessage.split("\n").map((data, outputindex) => {
                        return <div key={outputindex}>{data}</div>;
                      })}

                    </div>

                  </div>
                );
              })
            : ""}
        </Panel>
        <PanelResizeHandle
          className="cursor-row-resize bg-primaryDark"
          style={{ height: "4px", backgroundColor: "gray" }}
        />
        <Panel defaultSize={10} className="bg-primary">
          <SmButton bgColor="basic" text="실행하기" onClick={onCompileClick} />
          <SmButton
            bgColor="green"
            text="제출하기"
            onClick={
              JSON.parse(sessionStorage.getItem("isPractice"))
                ? onPracticeSubmit
                : onBattleSubmit
            }
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Ide;
