import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AudioContextProvider } from "./context/AudioContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AudioContextProvider>
        <App />
      </AudioContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
