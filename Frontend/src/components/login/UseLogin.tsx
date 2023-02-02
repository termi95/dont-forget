import { FormEvent, useState } from "react";
import { api } from "../../api/api";
import { UserLogin } from "../../types/User";
const userInitialState: UserLogin = {
  email: "",
  password: "",
};
export const UseLogin = () => {
  const [user, setUser] = useState<UserLogin>(userInitialState);
  
  const login = async () => {
    await api
      .post("/auth/login", { ...user })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          // to do
        }
      })
      .catch((error) => {});
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
