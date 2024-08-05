import React from "react";
import SmoothScrolling from "./utils/smoothScrolling.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { SocketContextProvider } from "./context/SocketContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <SmoothScrolling>
            <App />
          </SmoothScrolling>
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
=======
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
>>>>>>> 414a2c56b023d9112bd73108d2b1ef2a4ffa8678
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
