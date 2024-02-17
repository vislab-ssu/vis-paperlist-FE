import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalContext>
);
