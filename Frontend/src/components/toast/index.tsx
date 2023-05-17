import {
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiFillWarning,
  BiColorFill,
  CgDanger,
} from "react-icons/all";
import "../../style/toast.scss";
import { useState } from "react";

interface Props {
  title: string;
  message: string;
  type: string;
}

function Toast({ message, title, type }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

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

  const closeToast = () => {
    setIsVisible(false);
  };

  const render = () => {
    if (isVisible) {
      return (
        <>
          <div className="notification top-center toast-success">
            <div className="notification-container">
              <div>
                <div className="notification-image">{iconType(type)}</div>
                <button onClick={closeToast}>X</button>
              </div>
              <div>
                <p className="notification-title">{title}</p>
                <p className="notification-message">{message}</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  return { render };
}
export default Toast;
