import { AiFillPlusCircle } from "react-icons/ai";
import AddTask from "./AddTask";
import { useState } from "react";

function AddTaskContainer() {
    const [addProjectFlag, setAddProjectFlag] = useState(false);
    const handleAddClick = (flag: boolean) => {
      setAddProjectFlag(flag);
    };

return(
    <>    
    {addProjectFlag && <AddTask handleAddClick={handleAddClick} />}
              <div className="add-task">
                <AiFillPlusCircle
                  className="add-task-button"
                  onClick={() => handleAddClick(!addProjectFlag)}
                />
              </div>
    </>
)
    
}

export default AddTaskContainer;