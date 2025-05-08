import { Outlet, useLocation, useParams } from "react-router-dom";
import React from "react";
import DashboardMenu from "@components/static/dashboard_menu/dashboard_menu";
import "./dashboard.scss";
import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Group, Stack } from "@mantine/core";
import { version } from "../../../package.json";

const Dashboard = () => {
  const location = useLocation();
  const params = useParams();

  const dashboardPath = useMemo(() => {
    let path = location.pathname;
    if (path.indexOf("?") !== -1) {
      // strip query params
      path = location.pathname.split(path.indexOf("?")[0]);
    }
    // remove /dashboard from path
    path = path.replace("/dashboard", "");
    if (params) {
      path = Object.values(params).reduce(
        (_path, _param) => _path.replace("/" + _param, ""),
        path,
      );
    }
    return path ? path.split("/").filter(i => i) : null;
  }, [location.pathname, params]);

  return <div className="dashboard">
    <DashboardMenu />
    <div className="dashboard__header">
      Dashboard
      {dashboardPath && dashboardPath.map((path, index) =>
        <React.Fragment key={index}>
          <Icon icon="tabler:chevron-right" width="1rem" height="1rem"></Icon>
          <span style={{ textTransform: "capitalize" }}>
            {path}
          </span>
        </React.Fragment>
      )}
    </div>
    <div className="dashboard__content">
      <Outlet />
    </div>
    <div className="dashboard__footer">
      <Stack>
        <Group justify="space-between">
          <Group gap="xs">
            <span>{`Version ${version}`}</span>
            <span>© 2025 Oliver Tworkowski</span>
          </Group>
          <span>
            <a href="https://sensebox-data-dashboard.de/">GitHub Repository</a>
          </span>
        </Group>
        <Group>
          <span>
            <a href="/about">About</a>
          </span>
          <span>
            <a href="/about#how-to-use">How to use</a>
          </span>
        </Group>
      </Stack>
    </div>
  </div>;
};

export default Dashboard;