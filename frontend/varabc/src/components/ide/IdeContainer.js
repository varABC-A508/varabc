import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Ide from ".";
import Problem from "./Problem";
import { useParams } from "react-router-dom";
import { useState } from "react";

function IdeContainer() {
  const params = useParams();
  const problemNo = params.problemNo;
  const [memberNo, setMemberNo] = useState('');
  const accessToken = sessionStorage.getItem('access-token');

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={30} style={{ overflowY: "auto" }}>
        <Problem problemNo={problemNo} />
      </Panel>
      <PanelResizeHandle className="cursor-col-resize" style={{ width: '4px', backgroundColor: 'gray' }} />
      <Panel defaultSize={70}>
        <Ide className="w-full" problemNo={problemNo} />
      </Panel>
    </PanelGroup>
  );
}

export default IdeContainer;