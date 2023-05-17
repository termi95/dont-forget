import {
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiFillWarning,
  CgDanger,
} from "react-icons/all";
import "../../style/toast.scss";

interface Props {
  message: string;
  type: string;
}

function Toast({ message, type }: Props) {
  const iconType = (type: string) => {
    switch (type) {
      case "success":
        return <AiFillCheckCircle />;
      case "danger":
        return <CgDanger />;
      case "info":
        return <AiFillInfoCircle />;
      case "warning":
        return <AiFillWarning />;
      default:
        return <AiFillCheckCircle />;
    }
  };

  return (
    <>
      <div className={"notification top-center toast-" + type}>
        <div className="notification-container">
          <div className="notification-container-top">
            <div className="notification-image">{iconType(type)}</div>
            <button onClick={() => {}}>X</button>
          </div>
          <div className="notification-container-bottom">
            <p className="notification-message">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Toast;
