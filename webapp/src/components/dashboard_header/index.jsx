import React from "react";
import { Avatar, Indicator, Kbd, TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import "./style.scss";

const DashboardHeader = () => {
  return (
    <div className="sbd-dashboard-header">
      <div className="sbd-dashboard-header__content">
        <div className="sbd-dashboard-header__favorites">
          {/* <Avatar.Group spacing="sm">
          <Avatar color="blue"></Avatar>
          <Avatar color="blue"></Avatar>
          <Avatar color="blue"></Avatar>
          <Avatar>+4</Avatar>
        </Avatar.Group> */}
          {/* <Avatar.Group spacing="sm">
          <Avatar src={null} radius="xl" />
          <Avatar src={null} radius="xl" />
          <Avatar src={null} radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group> */}
          <Indicator
            inline
            size={16}
            offset={7}
            position="bottom-end"
            color="green"
            withBorder
          >
            <Avatar src={null} radius="xl" />
          </Indicator>
        </div>
        <TextInput
          placeholder="Find a SenseBox"
          icon={<Search size={16} />}
          rightSectionWidth={90}
          rightSection={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Kbd>Ctrl</Kbd>
              <span style={{ margin: "0 5px" }}>+</span>
              <Kbd>K</Kbd>
            </div>
          }
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
