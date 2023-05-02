import {
  AiOutlineArrowDown,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineExclamation,
} from "react-icons/all";
import { Priority } from "../../types/Task";
import { useState } from "react";

interface Props {
  initialPriority: Priority;
}
function UseTask({initialPriority}:Props) {  
  const [priority, setPriority] = useState<Priority>(initialPriority);

  const handleChangePriority = (value: Priority) => {
    setPriority(value);
  };
  const getArrowPrioritet = (priorytet: Priority) => {
    switch (priorytet) {
      case Priority.LOW:
        return <AiOutlineArrowDown title="Low priority" />;
      case Priority.MEDIUM:
        return <AiOutlineArrowRight title="Medium priority" />;
      case Priority.HIGH:
        return <AiOutlineArrowUp title="High priority" />;
      case Priority.CRITICAL:
        return <AiOutlineExclamation title="Critical priority" />;
      default:
        throw new Error("Priority not found");
    }
  };
  return { getArrowPrioritet, handleChangePriority, priority };
}

export default UseTask;
