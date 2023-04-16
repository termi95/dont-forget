import { AiFillPlusCircle } from "react-icons/ai";
import AddTask from "./AddTask";
import { useState } from "react";

function AddTaskContainer() {
  const [addProjectFlag, setAddProjectFlag] = useState(false);

  return (
    <>
      {addProjectFlag && (
        <AddTask
          handleAddClick={() => setAddProjectFlag(false)}
          isUpdate={false}
          taskId={0}
        />
      )}
      <div className="add-task">
        <AiFillPlusCircle
          className="add-task-button"
          onClick={() => setAddProjectFlag(true)}
        />
      </div>
    </>
  );
}

export default AddTaskContainer;
