import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "./providers/context/app-context.jsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Toaster />

        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
