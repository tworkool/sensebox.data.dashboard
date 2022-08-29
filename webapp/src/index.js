import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import "./style.scss";

const queryClient = new QueryClient();
const root = document.getElementById("root");
ReactDOM.render(
  <MantineProvider>
    <NotificationsProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationsProvider>
  </MantineProvider>,
  root
);
