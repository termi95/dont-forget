import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Spiner from "./components/spiner/Spiner";
import ErrorPage from "./error-page";

const Register = React.lazy(() => import("./components/register/Register"));
const Project = React.lazy(() => import("./components/project/Project"));

function App() {
  return (
    <Suspense fallback={<Spiner/>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="project" element={<Project />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
