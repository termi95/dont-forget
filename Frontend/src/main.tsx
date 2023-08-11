import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./AppContext";
import MenuProvider from "./components/menu/MenuContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
