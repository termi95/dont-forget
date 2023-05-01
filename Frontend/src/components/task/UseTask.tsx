import {
  AiOutlineArrowDown,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineExclamation,
} from "react-icons/all";
import { Priority } from "../../types/Task";

function UseTask() {
  const getArrowPrioritet = (priorytet: Priority) => {
    switch (priorytet) {
      case Priority.LOW:
        return <AiOutlineArrowDown title="Low priority"/>;
      case Priority.MEDIUM:
        return <AiOutlineArrowRight  title="Medium priority"/>;
      case Priority.HIGH:
        return <AiOutlineArrowUp  title="High priority"/>;
      case Priority.CRITICAL:
        return <AiOutlineExclamation  title="Critical priority"/>;
      default:
        throw new Error("Priority not found");
    }
  };
  return { getArrowPrioritet };
}

export default UseTask;
