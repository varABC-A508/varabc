import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Ide from ".";
import Problem from "./Problem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function IdeContainer() {
  const params = useParams();
  const problemNo = params.problemNo;
  const [memberNo, setMemberNo] = useState('');
  const accessToken = sessionStorage.getItem('access-token');

  const getMemberNo = () => {
    axios.get("https://varabc.com:8080/member/getUserInfo", {
      headers: {
        "access-token": accessToken
      }
    }).then((res) => {
      console.log(">>>>멤버 정보 요청", res);
      setMemberNo(res.userInfo.memberNo);
    }).catch(function (err) {
      alert("멤버 정보 요청\n" + err);
    });
  }

  useEffect(() => {
    getMemberNo();
  },[]);

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={30} style={{ overflowY: "auto" }}>
        <Problem problemNo={problemNo} />
      </Panel>
      <PanelResizeHandle className="cursor-col-resize" style={{ width: '4px', backgroundColor: 'gray' }} />
      <Panel defaultSize={70}>
        <Ide className="w-full" problemNo={problemNo} memberNo={memberNo} />
      </Panel>
    </PanelGroup>
  );
}

export default IdeContainer;