import React from "react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";
import { version } from "../../../package.json";
import "./style.scss";

const DashboardFooter = () => {
  return (
    <div className="sbd-dashboard-page-footer">
      <div className="sbd-dashboard-page-footer__content">
        <Group>
          <Text>Sensebox Data Dashboard</Text>
          <Text size="xs" color="dimmed">{`version ${version}`}</Text>
          <ActionIcon
            color="dark"
            variant="subtle"
            //variant="filled"
            size="sm"
            component="a"
            href="https://github.com/tworkool/sensebox.data.dashboard"
            target="_blank"
          >
            <BrandGithub />
          </ActionIcon>
        </Group>
        <Text>{`© Oliver Tworkowski ${new Date().getFullYear()}`}</Text>
      </div>
    </div>
  );
};

export default DashboardFooter;
