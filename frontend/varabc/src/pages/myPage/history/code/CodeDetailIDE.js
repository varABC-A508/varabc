import { useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "./CodeDetailIDE.css";

const CodeDetailIDE = ({ language, code }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.resize();
    }
  }, []);

  return (
    <div className="w-full" id="mycode">
      <AceEditor
        ref={editorRef}
        theme="dracula"
        mode={language}
        value={code}
        fontSize={16}
        readOnly={true}
        focus={false}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        highlightActiveLine={false}
        highlightSelectedWord={false}
        style={{ width: "100%", minHeight: "600px" }}
        setOptions={{
          readOnly: true,
          highlightSelectedWord: false,
          highlightGutterLine: false,
          showInvisibles: false,
          behavioursEnabled: true,
          wrapBehavioursEnabled: true,
        }}
      />
    </div>
  );
};

export default CodeDetailIDE;
