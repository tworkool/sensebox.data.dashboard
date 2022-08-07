import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./redux/store";
import "./style.scss";

const root = document.getElementById("root");
ReactDOM.render(
  <MantineProvider>
    <NotificationsProvider>
      <ReduxStoreProvider store={store}>
        <App />
      </ReduxStoreProvider>
    </NotificationsProvider>
  </MantineProvider>,
  root
);
