import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Spiner from "./components/spiner/Spiner";
import ErrorPage from "./error-page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Register = React.lazy(() => import("./components/register/Register"));
const Project = React.lazy(() => import("./components/project/Project"));
const Settings = React.lazy(() => import("./components/project/settings/Settings"));

function App() {
  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="project" element={<Project />} />
        <Route path="project/settings/:projectId" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <div className="t10">
        <ToastContainer />
      </div>
    </Suspense>
  );
}

export default App;
