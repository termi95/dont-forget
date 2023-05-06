import { useRef } from "react";
import "../../../style/taskBody.scss";
import { Priority } from "../../../types/Task";
import UseTaskBody from "./UseTaskBody";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

interface Props {
  id: number;
  refreshPriority: (value: Priority) => void;
}

function TaskBody({ id, refreshPriority }: Props) {
  const {
    priorityTaskOptions,
    changeTaskPriority,
    taskProperties,
    handleSaveContent,
  } = UseTaskBody({ id, refreshPriority });
  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <>
      <div className="task-body-content-wraper">
        <div className="task-body-content">
          <div className="task-priority">
            <label htmlFor="priority">
              <p>Priority:</p>
            </label>
            <select
              onChange={(e) => {
                changeTaskPriority(e.target);
              }}
              value={taskProperties?.priority}
            >
              {priorityTaskOptions()}
            </select>
          </div>
          <br />
          <div className="task-body-content-text">
            <Editor
              textareaName="Description"
              onInit={(evt, editor) => (editorRef.current = editor)}              
              value={taskProperties?.body}
            />
            <button
              className="task-body-content-button"
              onClick={() => handleSaveContent(editorRef.current?.getContent())}
            >
              save
            </button>
          </div>
        </div>
        <div className="chat">tu będzię czat</div>
      </div>
    </>
  );
}
export default TaskBody;
