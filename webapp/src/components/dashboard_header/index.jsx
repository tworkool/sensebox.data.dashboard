import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSenseboxesData } from "../../redux/selectors/appState";
import { requestSenseboxesDataFetch } from "../../redux/actions/app_state";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Highlight,
  Kbd,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { Bookmark, Search } from "tabler-icons-react";
import "./style.scss";
import { useNavigate } from "react-router";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const senseboxesData = useSelector(getSenseboxesData);
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  return (
    <div className="sbd-dashboard-header">
      <div className="sbd-dashboard-header__content">
        <div className="sbd-dashboard-header__favorites">
          <Avatar.Group spacing="sm">
            <Avatar src={null} radius="xl" />
            <Avatar src={null} radius="xl" />
            <Avatar src={null} radius="xl" />
            <Avatar radius="xl">+5</Avatar>
          </Avatar.Group>
          {/* <Indicator
            inline
            size={16}
            offset={7}
            position="bottom-end"
            color="green"
            withBorder
          >
            <Avatar src={null} radius="xl" />
          </Indicator> */}
        </div>
        <TextInput
          onClick={() => {
            setOpened(true);
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
          <Group spacing="xs" grow>
            <TextInput
              defaultValue={searchContent}
              placeholder="Find a SenseBox"
              icon={<Search size={16} />}
              onChange={(e) => {
                setSearchContent(e.target.value);
              }}
            />
            <div>
              <Button
                onClick={() => {
                  // FETCH BOXES
                  dispatch(requestSenseboxesDataFetch({ name: searchContent }));
                }}
              >
                Search
              </Button>
            </div>
          </Group>

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
          <div>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            {senseboxesData.data === undefined ? (
              <Center style={{ height: 200 }}>
                <div>No Senseboxes found</div>
              </Center>
            ) : (
              senseboxesData.data.map((e, i) => (
                <UnstyledButton
                  onClick={() => {
                    navigate(`../dashboard/${e._id}`, { replace: true });
                    setOpened(false);
                  }}
                  key={i}
                  className="sbd-dashboard-header-search-result"
                >
                  <Group>
                    <Avatar src={null} radius="xl" />
                    <Stack
                      spacing="xs"
                      className="sbd-dashboard-header-search-result__info"
                    >
                      <Highlight
                        highlightColor="blue"
                        highlight={searchContent}
                        weight={600}
                      >
                        {e.name}
                      </Highlight>
                      <Text size="xs" color="dimmed">
                        {e._id}
                      </Text>
                    </Stack>
                  </Group>
                </UnstyledButton>
              ))
            )}
          </div>
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
