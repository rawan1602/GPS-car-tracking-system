import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CardProvider from "./Components/CardProvider.jsx";
import SelectCategoryProvider from "./Components/SelectCategoryProvider.jsx";
import SelectStatusProvider from "./Components/SelectStatusProvider.jsx";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <CardProvider>
        <SelectCategoryProvider>
          <SelectStatusProvider>
            <App />
          </SelectStatusProvider>
        </SelectCategoryProvider>
      </CardProvider>
    </BrowserRouter>
  </Provider>
);
