import React from "react";
import ReactDOM from "react-dom";
import App, { CustomMantineProvider } from "./containers/app";
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./redux/store";
import "./style.scss";

const root = document.getElementById("root");
ReactDOM.render(
  <CustomMantineProvider>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </CustomMantineProvider>,
  root
);
