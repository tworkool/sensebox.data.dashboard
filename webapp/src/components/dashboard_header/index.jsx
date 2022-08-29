import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Group,
  Highlight,
  Indicator,
  Kbd,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { Bookmark, Search } from "tabler-icons-react";
import "./style.scss";

const DashboardHeader = () => {
  const [opened, setOpened] = useState(false);
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
          onClick={() => {
            setOpened((old) => !old);
          }}
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
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Search Sensebox"
        >
          <TextInput
            placeholder="Find a SenseBox"
            icon={<Search size={16} />}
          />
          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <Search size={12} />
                <Box ml={5}>Search results</Box>
              </>
            }
          />
          <UnstyledButton className="sbd-dashboard-header-search-result">
            <Group>
              <Avatar src={null} radius="xl" />
              <Stack
                spacing="xs"
                className="sbd-dashboard-header-search-result__info"
              >
                <Highlight highlight={"cool"} weight={600}>
                  Die Coolste Sensebox
                </Highlight>
                <Text size="xs" color="dimmed">
                  8128121570175aksnfahf801
                </Text>
              </Stack>
            </Group>
          </UnstyledButton>
          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <Bookmark size={12} />
                <Box ml={5}>Bookmarked Senseboxes</Box>
              </>
            }
          />
          <Group>
            <Avatar src={null} radius="xl" />
            <Avatar src={null} radius="xl" />
            <Avatar src={null} radius="xl" />
          </Group>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardHeader;
