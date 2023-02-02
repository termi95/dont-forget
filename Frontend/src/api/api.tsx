import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3001/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const saveToken = (token: string, userId: any) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userId", userId);
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
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
    if (error.response.status === 401) {
      removeToken();
      window.location.href = "/";
    }
    return error;
  }
);

export { api, saveToken, removeToken };
