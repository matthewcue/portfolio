import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

const redirectTarget = new URLSearchParams(window.location.search).get("redirect");
if (redirectTarget) {
  window.history.replaceState(null, "", redirectTarget);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
