import axios from "axios";
import UseToast from "../UseToast";
const { ShowError } = UseToast();

const api = axios.create({
  baseURL: "http://127.0.0.1:5143/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
};

api.interceptors.request.use((req) => {
  if (
    localStorage.getItem("accessToken") !== null &&
    req.headers !== undefined &&
    (req.headers.Authorization === "Bearer null" ||
      req.headers.Authorization !==
        `Bearer ${localStorage.getItem("accessToken")}`)
  ) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    ShowError(error.response.data.message);
    if (error.response.status === 401 &&  localStorage.getItem("accessToken") !== null) {
      removeToken();
      window.location.href = "/";
    }
    return error;
  }
);

export { api, saveToken, removeToken };
