import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Ide from ".";
import Problem from "./Problem";
<<<<<<< HEAD

=======
import { useLocation } from "react-router-dom";
>>>>>>> 460191dbfec67728f6aa6beb9f43feb03ed8d100

function IdeContainer() {
  const {state} = useLocation();
  return (
    <PanelGroup direction="horizontal">
        <Panel defaultSize={30} style={{overflowY:"auto"}}>
            <Problem problemNo={state} />
        </Panel>
        <PanelResizeHandle className="cursor-col-resize" style={{ width: '4px', backgroundColor:'gray' }} />
        <Panel defaultSize={70}>
<<<<<<< HEAD
          <Ide className="w-full" />
=======
          <Ide className="w-full" problemNo={state} />
>>>>>>> 460191dbfec67728f6aa6beb9f43feb03ed8d100
        </Panel>
    </PanelGroup>
  );
}

export default IdeContainer;