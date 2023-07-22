import { useRef } from "react";
import { Privileges } from "../../../types/Project";

function UseSettings() {
  const userToAddRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const userPrivilagesOptions = () => {
    const privileges = Object.values(Privileges);
    const firstHalf = privileges.slice(0, privileges.length / 2);
    return firstHalf.map((value, index) => {
      let text = value.toString();
      text = text.slice(0, 1) + text.slice(1).toLowerCase();
      return (
        <option key={index} value={index}>
          {text}
        </option>
      );
    });
  };

  const addUser = () => {
    if (selectRef.current !== null && userToAddRef.current !== null) {
      console.log(selectRef.current.value, userToAddRef.current.value);
    }
  };

  return { userToAddRef, selectRef, userPrivilagesOptions, addUser };
}

export default UseSettings;
