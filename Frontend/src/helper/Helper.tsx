import { useContext } from "react";
import LoginUserInfo from "../types/App";
import { AppContext } from "../AppContext";

export default function Helper() {
  const { setLoginUser } = useContext(AppContext);
  function SetAppContext(userInfo: LoginUserInfo) {
    localStorage.setItem("UserInfo", JSON.stringify(userInfo));
  }
  function GetAppContext() {
    let storage = localStorage.getItem("UserInfo");
    let userInfo = null;
    if (storage !== null) {
      userInfo = JSON.parse(storage) as LoginUserInfo;
      setLoginUser({ ...userInfo });
    } else {
      if (window.innerWidth <= 600) {
        setLoginUser((prev) => ({ ...prev, isMobile: true }));
      } else {
        setLoginUser((prev) => ({ ...prev, isDesktop: true }));
      }
    }
  }
  return {
    SetAppContext,
    GetAppContext,
  };
}
