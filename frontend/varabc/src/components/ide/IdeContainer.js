import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Ide from ".";
import Problem from "./Problem";
import ideStore from '../../redux/Store/ideStore';
import { Provider } from 'react-redux';

function IdeContainer() {
  return (
    <PanelGroup direction="horizontal">
        <Panel defaultSize={30} style={{overflowY:"auto"}}>
            <Problem />
        </Panel>
        <PanelResizeHandle className="cursor-col-resize" style={{ width: '4px', backgroundColor:'gray' }} />
        <Panel defaultSize={70}>
          <Provider store={ideStore}>
            <Ide className="w-full" />
          </Provider>
        </Panel>
    </PanelGroup>
  );
}

export default IdeContainer;