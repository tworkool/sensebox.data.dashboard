import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./redux/store";
import posthog from "posthog-js";
import "./style.scss";
import "./utils/osemicons.scss";
import ENVIRONMENT from "./utils/env";

posthog.init(ENVIRONMENT.POSTHOG_API_TOKEN, {
  api_host: ENVIRONMENT.POSTHOG_API_HOST,
});

const root = document.getElementById("root");
ReactDOM.render(
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    withCSSVariables
    theme={{
      breakpoints: {
        xs: 320,
        sm: 375,
        md: 767,
        lg: 1023,
        xl: 1440,
      },
    }}
  >
    <NotificationsProvider>
      <ReduxStoreProvider store={store}>
        <App />
      </ReduxStoreProvider>
    </NotificationsProvider>
  </MantineProvider>,
  root
);
