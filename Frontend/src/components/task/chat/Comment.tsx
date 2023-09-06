import {} from "../../../style/chat.css";
interface Props {
  message: string;
  user: string;
  time: string;
  possition: string;
  color: 1 | 0;
}

export function Comment({ message, user, time, possition, color }: Props) {
  function colorPicker(color: number) {
    return color === 1 ? "bg-white" : "bg-smoke";
  }
  return (
    <>
      <div className={["space-top", `comment-${possition}`].join(" ")}>
        <span className={["comment t00 pad mar space", `${colorPicker(color)}`].join(" ")}>
          <p className={["flex pad-bottom space-between ", `${colorPicker(color)}`].join(" ")}>
            <span>{user}</span>
            <span style={{ fontSize: "10px", alignSelf: "center" }}>
              {time}
            </span>
          </p>
          {message}
        </span>
      </div>
    </>
  );
}
