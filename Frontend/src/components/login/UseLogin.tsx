import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, saveToken } from "../../api/api";
import { UserLogin } from "../../types/User";
import UseToast from "../../UseToast";
import { AppContext } from "../../AppContext";
import { MenuContext } from "../menu/MenuContext";
const userInitialState: UserLogin = {
  email: "",
  password: "",
};
export const UseLogin = () => {
  const [user, setUser] = useState<UserLogin>(userInitialState);
  const { setLoginUser } = useContext(AppContext);
  const { setIsMenuExpaned } = useContext(MenuContext);  
  const { ShowError } = UseToast();

  let navigate = useNavigate();
  const login = async () => {
    await api
      .post("/user/login", { ...user })
      .then((res) => {
        if (res.status === 200) {
          saveToken(res.data);

          if (window.innerWidth <= 600) {
            setLoginUser((prev) => ({ ...prev, isMobile: true }));
            setIsMenuExpaned(false);
          } else {
            setLoginUser((prev) => ({ ...prev, isDesktop: true }));
            setIsMenuExpaned(true);
          }

          return navigate("/project");
        }
      })
      .catch((error) => {
        ShowError("We encountered a problem connecting to the server.");
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    login();
  };
  const handleChange = (e: HTMLInputElement) => {
    let newUserData = { ...user };
    if (e.name === "email") {
      newUserData.email = e.value;
    } else if (e.name === "password") {
      newUserData.password = e.value;
    }
    setUser(newUserData);
  };
  return {
    handleSubmit,
    handleChange,
  };
};
