import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    basename={`${
      !import.meta.env?.VITE_PATH
        ? window.location.pathname
        : `/${import.meta.env?.VITE_PATH}`
    }`}
  >
    <App />
    <ToastContainer
      position="top-right"
      theme="colored"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className={"mt-5"}
    />
  </BrowserRouter>
);
