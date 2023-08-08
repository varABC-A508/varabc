import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Ide from ".";
import Problem from "./Problem";
import { useLocation } from "react-router-dom";

function IdeContainer() {
  const {state} = useLocation();
  return (
    <PanelGroup direction="horizontal">
        <Panel defaultSize={30} style={{overflowY:"auto"}}>
            <Problem problemNo={state} />
        </Panel>
        <PanelResizeHandle className="cursor-col-resize" style={{ width: '4px', backgroundColor:'gray' }} />
        <Panel defaultSize={70}>
          <Ide className="w-full" problemNo={state} />
        </Panel>
    </PanelGroup>
  );
}

export default IdeContainer;