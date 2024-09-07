import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store} >
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
