import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, saveToken } from "../../api/api";
import { UserLogin } from "../../types/User";
import UseToast from "../../UseToast";
const userInitialState: UserLogin = {
  email: "",
  password: "",
};
export const UseLogin = () => {
  const [user, setUser] = useState<UserLogin>(userInitialState);
  const { ShowError } = UseToast();

  let navigate = useNavigate();
  const login = async () => {
    await api
      .post<{ access_token: string; id: string }>("/auth/login", { ...user })
      .then((res) => {
        if (res.status === 200) {
          saveToken(res.data.access_token, res.data.id);
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
