import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSenseboxesData } from "../../redux/selectors/appState";
import { requestSenseboxesDataFetch } from "../../redux/actions/app_state";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  FocusTrap,
  Group,
  Highlight,
  Indicator,
  Kbd,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { Bookmark, Search } from "tabler-icons-react";
import "./style.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import NoDataContainer from "../../containers/no_data";
import IdenticonAvatar from "../identicon_avatar";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { DashboardContext } from "../../pages/dashboard";
import CONSTANTS from "../../utils/constants";

const DashboardHeader = () => {
  const [, setSearch] = useSearchParams();
  const dispatch = useDispatch();
  const dashboardContext = useContext(DashboardContext);
  const senseboxesData = useSelector(getSenseboxesData);
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchHighlightContent, setSearchHighlightContent] = useState("");
  const [bookmarkedBoxes] = useLocalStorage({
    key: "bookmarked-senseboxes",
    defaultValue: [],
  });
  useHotkeys([["mod+K", () => setOpened(true)]]);
  const [searchError, setSearchError] = useState(null);

  const handleSearchExecution = useCallback(() => {
    if (searchContent === "") {
      setSearchError("cannot be empty");
      return;
    }
    if (searchContent.length < CONSTANTS.MIN_SENSEBOX_SEARCH_CHARACTERS) {
      setSearchError(
        `please type in at least ${CONSTANTS.MIN_SENSEBOX_SEARCH_CHARACTERS} characters`
      );
      return;
    }
    dispatch(requestSenseboxesDataFetch({ name: searchContent }));
    setIsLoading(true);
    setSearchHighlightContent(searchContent);
    setSearchError(null);
  }, [dispatch, searchContent]);

  useEffect(() => {
    if (!senseboxesData.data) return;
    setIsLoading(false);
  }, [senseboxesData]);

  const handleSenseboxSelect = useCallback(
    (id) => {
      setSearch({ [CONSTANTS.ROUTING.SENSEBOX_ID]: id });
      setOpened(false);
    },
    [setSearch]
  );

  return (
    <div className="sbd-dashboard-header">
      <div className="sbd-dashboard-header__content">
        <div className="sbd-dashboard-header__favorites">
          <Indicator size={16} position="middle-end" color="green" withBorder>
            <IdenticonAvatar id={dashboardContext.selectedSenseboxId} />
          </Indicator>
        </div>
        <TextInput
          className="sbd-hide--phone"
          variant="filled"
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
        <Button
          leftIcon={<Search size={18} />}
          variant="light"
          color="gray"
          onClick={() => {
            setOpened(true);
          }}
          className="sbd-hide--tablet-and-desktop"
        >
          Find Sensebox
        </Button>
        <Modal
          size={"lg"}
          opened={opened}
          onClose={() => setOpened(false)}
          title="Find a Sensebox"
        >
          <div className="sbd-search-grid">
            <FocusTrap active>
              <TextInput
                defaultValue={searchContent}
                placeholder="Search by name"
                icon={<Search size={16} />}
                onChange={(e) => {
                  setSearchContent(e.target.value);
                }}
                error={searchError}
              />
              <Button onClick={handleSearchExecution}>Search</Button>
            </FocusTrap>
          </div>

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

            {senseboxesData?.data === undefined ||
            senseboxesData?.data?.length === 0 ? (
              <Center style={{ height: 200 }}>
                <NoDataContainer>
                  Search for a Sensebox by its name in the field above
                </NoDataContainer>
              </Center>
            ) : (
              senseboxesData.data.map((e, i) => (
                <UnstyledButton
                  onClick={() => {
                    handleSenseboxSelect(e._id);
                  }}
                  key={i}
                  className="sbd-dashboard-header-search-result"
                >
                  <Group>
                    <IdenticonAvatar id={e._id} />
                    <Stack
                      spacing="xs"
                      className="sbd-dashboard-header-search-result__info"
                    >
                      <Highlight
                        highlightColor="blue"
                        highlight={searchHighlightContent}
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
          <Group position="center">
            {bookmarkedBoxes.length === 0 && (
              <Group position="center" grow>
                <Text size="sm" color="dimmed">
                  No Bookmarked Boxes yet!
                </Text>
              </Group>
            )}
            {bookmarkedBoxes.map((e, i) => {
              return (
                <Tooltip
                  key={i}
                  label={e.name}
                  color="dark"
                  position="bottom"
                  withArrow
                >
                  <UnstyledButton
                    onClick={(_) => {
                      handleSenseboxSelect(e._id);
                    }}
                  >
                    {e._id === dashboardContext.selectedSenseboxId ? (
                      <Indicator
                        size={16}
                        position="middle-end"
                        color="green"
                        withBorder
                      >
                        <IdenticonAvatar id={e._id} />
                      </Indicator>
                    ) : (
                      <IdenticonAvatar id={e._id} />
                    )}
                  </UnstyledButton>
                </Tooltip>
              );
            })}
          </Group>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardHeader;
