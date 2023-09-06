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
    ref,
    handleAddComment,
    CommentList,
    handleKeyDown,
  } = UseTaskBody({ id, projectId, refreshPriority });
  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <>
      <div className="task-body-content-wraper ">
        <div className="task-body-content w50">
          <div className="flex column h100 space-between">
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
                className="task-body-content-button t00"
                onClick={() =>
                  handleSaveContent(editorRef.current?.getContent())
                }
              >
                save
              </button>
            </div>
          </div>
        </div>
        <div className="flex column chat-border space-between min-w50">
          <div className="chat flex scroll-y">{CommentList()}</div>
          <div className="flex column sm-space-left">
            <textarea
              ref={ref}
              name="comment"
              cols={10}
              rows={2}
              className="t00 comment-border-radius w100 sm-pad"
              onKeyDown={(e)=>handleKeyDown(e)}
            ></textarea>
            <button className="t00 w100 sm-pad" onClick={handleAddComment}>
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default TaskBody;
