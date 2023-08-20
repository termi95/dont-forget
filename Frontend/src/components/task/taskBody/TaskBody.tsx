import { useRef } from "react";
import "../../../style/taskBody.scss";
import { Priority } from "../../../types/Task";
import UseTaskBody from "./UseTaskBody";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

interface Props {
  id: number;
  projectId: number;
  refreshPriority: (value: Priority) => void;
}

function TaskBody({ id, projectId, refreshPriority }: Props) {
  const {
    priorityTaskOptions,
    changeTaskPriority,
    taskProperties,
    handleSaveContent,
    doersOptions,
    changeDoer,
  } = UseTaskBody({ id, projectId, refreshPriority });
  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <>
      <div className="task-body-content-wraper">
        <div className="task-body-content">
          <div className="flex">
            <div className="task-priority">
              <label>
                <p className="t00">Priority:</p>
              </label>
              <select
                className="t00"
                onChange={(e) => {
                  changeTaskPriority(e.target);
                }}
                value={taskProperties?.priority}
              >
                {priorityTaskOptions()}
              </select>
            </div>
            <div className="pad-left">
              <label>
                <p className="t00">Doer:</p>
              </label>
              <select
                className="t00"
                onChange={(e) => {
                  changeDoer(e.target);
                }}
                value={taskProperties?.DoerId}
              >
                {doersOptions()}
              </select>
            </div>
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
