import { AiFillCheckCircle, BiColorFill } from "react-icons/all";
import "../../style/toast.scss";

interface Props {
  title: string;
  message: string;
}

function Toast({ message, title }: Props) {
  return (
    <div className="notification top-center toast-success">
      <div className="notification-container">
        <div className="notification-image">
          <AiFillCheckCircle />
        </div>
        <button>X</button>
        <div>
          <p className="notification-title">{title}</p>
          <p className="notification-message">{message}</p>
        </div>
      </div>
    </div>
  );
}
export default Toast;
