import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Ide from ".";
import Problem from "./Problem";
import { useParams } from "react-router-dom";

function IdeContainer() {
  const params = useParams();
  const problemNo = params.problemNo;

  return (
    <PanelGroup direction="horizontal">
      <Panel className="h-screen bg-primaryDark" defaultSize={30} style={{ overflowY: "auto" }}>
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