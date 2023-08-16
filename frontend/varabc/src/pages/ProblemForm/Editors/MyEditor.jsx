import { useMemo, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImageURLs } from "../../../redux/Reducer/problemFormReducers.js";

// react-quill
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";

import toolbarOptions from "../../../utils/problemForm/toolbarOptions.jsx";

Quill.register("modules/imageResize", ImageResize);

const MyEditor = forwardRef(
  ({ content, handleEditorChange, minHeight }, ref) => {
    const dispatch = useDispatch();

    // 생성되는 blob url을 모두 저장
    const imageURLs = useSelector((state) => state.problemForm.imageURLs);
    const handleImageURLs = (image) => {
      const newImageURLs = [...imageURLs, image];
      dispatch(setImageURLs(newImageURLs));
    };

    // react-quill config에 사용할 custom imageHandler 함수
    const imageHandler = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.addEventListener("change", async () => {
        try {
          const file = input.files?.[0];
          if (!file) {
            return;
          }
          const Image = Quill.import("formats/image");
          const editor = ref.current.getEditor();
          editor.focus();
          const range = editor.getSelection(true);

          const imageURL = URL.createObjectURL(file);
          Image.sanitize = (imageURL) => imageURL;

          editor.insertEmbed(
            range.index,
            "image",
            imageURL,
            "data-image-id",
            1
          );
          editor.setSelection(range.index + 1);

          handleImageURLs(imageURL);
        } catch (error) {
          console.error("Error handling image:", error);
        }
      });
    };

    const modules = useMemo(() => {
      return {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: imageHandler,
          },
        },
        imageResize: {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 복사 붙여넣기 시 모든 양식을 지워주도록 override
    const handlePaste = (e) => {
      e.preventDefault();

      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData("Text");

      const quill = ref.current.getEditor();
      const selection = quill.getSelection(true);
      quill.focus();
      const cursorPosition = selection ? selection.index : 0;

      setTimeout(function () {
        quill.insertText(cursorPosition, pastedData);
      }, 2);
    };

    useEffect(() => {
      if (ref.current != null) {
        ref.current.getEditor().root.addEventListener("paste", handlePaste);
      }
      return () => {
        if (ref.current != null) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ref.current
            .getEditor()
            .root.removeEventListener("paste", handlePaste);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ReactQuill
        ref={ref}
        modules={modules}
        value={content}
        onChange={handleEditorChange}
        className="col-span-6 flex flex-col bg-white border-gray-200"
        style={{ minHeight: minHeight }}
      />
    );
  }
);

export default MyEditor;
