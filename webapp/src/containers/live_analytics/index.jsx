import React, { useCallback, useContext } from "react";
import {
  Text,
  Group,
  Center,
  SegmentedControl,
  Indicator,
  Table as MantineTable,
  Checkbox,
  Divider,
  Box,
  Badge,
  Tooltip,
  Button,
  Space,
  Stack,
  Radio,
  Popover,
  TextInput,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core";
import { useInterval, useWindowEvent } from "@mantine/hooks";
import "./style.scss";
import {
  BoxMultiple,
  Filter as TablerIconsFilter,
  X as IconX,
  Table,
  Refresh,
  FileSettings,
} from "tabler-icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSenseboxInfoData,
  getSenseboxSensorData,
} from "../../redux/selectors/appState";
import { useEffect } from "react";
import NoDataContainer from "../no_data";
import { capString } from "../../utils/helpers";
import CONSTANTS from "../../utils/constants";
import { requestSenseboxSensorDataFetch } from "../../redux/actions/app_state";
import { useMemo } from "react";
import LiveAnalyticsItem from "../../components/live_analytics_item";
import { DashboardContext } from "../../pages/dashboard";

const LiveAnalyticsContainer = () => {
  const dashboardContext = useContext(DashboardContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveUpdateEnabled, setIsLiveUpdateEnabled] = useState(true);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(
    () => setSeconds((s) => s + CONSTANTS.LIVE_ANALYTICS_INTERVAL_STEPS),
    CONSTANTS.LIVE_ANALYTICS_INTERVAL_STEPS * 1000
  );
  const [dispatchInterval, setDispatchInterval] = useState(
    CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL
  );
  const [dataView, setdataView] = useState("box-view");
  const senseboxInfoData = useSelector(getSenseboxSensorData);
  const senseboxMainInfoData = useSelector(getSenseboxInfoData);
  const sensorFilterDefaultValues = useMemo(
    () => ({
      type: null,
      showInactive: true,
      search: "",
    }),
    []
  );
  const [sensorFilters, setSensorFilters] = useState({
    ...sensorFilterDefaultValues,
  });
  const [filteredSenseboxInfoSensorData, setFilteredSenseboxInfoSensorData] =
    useState(undefined);

  const getLiveUpdateTime = useCallback(
    (secondsAgo) => {
      if (secondsAgo === null) {
        return null;
      } else {
        return secondsAgo + seconds;
      }
    },
    [seconds]
  );

  const areFiltersActive = useMemo(
    () =>
      sensorFilters.search !== sensorFilterDefaultValues.search ||
      sensorFilters.type !== sensorFilterDefaultValues.type ||
      sensorFilters.showInactive !== sensorFilterDefaultValues.showInactive,
    [sensorFilters, sensorFilterDefaultValues]
  );

  const refetchSensorData = useCallback(() => {
    setIsLoading(true);
    dispatch(requestSenseboxSensorDataFetch({ senseboxID: undefined }));
  }, [dispatch]);

  /**
   * on component mount and on each senseboxinfodata fetch -> manage interval state
   */
  useEffect(() => {
    const sensors = senseboxInfoData?.data;
    if (sensors && sensors.length != 0) {
      interval.start();
    } else {
      interval.stop();
    }
    return interval.stop;
  }, [senseboxInfoData, interval]);

  /**
   * stop/start live updates/refetches in case of window focus or blur
   */
  useWindowEvent("focus", () => {
    setIsWindowFocused(true);
  });
  useWindowEvent("blur", () => {
    setIsWindowFocused(false);
  });

  useEffect(() => {
    // TODO: ADJUST SECONDS THIS WITH BOX PROPERTY: UPDATED_AT
    if (isLiveUpdateEnabled && isWindowFocused && seconds > dispatchInterval) {
      setSeconds(0);
      refetchSensorData();
    }
  }, [
    refetchSensorData,
    isLiveUpdateEnabled,
    isWindowFocused,
    dispatchInterval,
    seconds,
  ]);

  const filterSelection = (text, handleOnClick) => (
    <Badge
      color="dark"
      /* radius="sm" */
      variant="filled"
      sx={{ paddingRight: 3 }}
      rightSection={
        <ActionIcon
          size="xs"
          color="blue"
          radius="xl"
          variant="transparent"
          onClick={handleOnClick}
        >
          <IconX size={14} color="white" strokeWidth={3} />
        </ActionIcon>
      }
    >
      {text}
    </Badge>
  );

  const handleFilters = useCallback((actionPayload) => {
    setSensorFilters((old) => ({ ...old, ...actionPayload }));
  }, []);

  const resetFilters = useCallback(
    (e, filterKey = undefined) => {
      if (filterKey !== undefined) {
        if (!Object.keys(sensorFilterDefaultValues).includes(filterKey)) {
          throw new Error("filterKey not part of default values");
        }
        setSensorFilters((old) => ({
          ...old,
          [filterKey]: sensorFilterDefaultValues[filterKey],
        }));
      } else {
        setSensorFilters({ ...sensorFilterDefaultValues });
      }
    },
    [sensorFilterDefaultValues]
  );

  useEffect(() => {
    resetFilters();
  }, [senseboxMainInfoData, resetFilters]);

  useEffect(() => {
    if (!senseboxInfoData?.data) return;
    setFilteredSenseboxInfoSensorData(
      senseboxInfoData.data.filter((item) => {
        if (!sensorFilters.showInactive && item.isDormant) return false;
        const typeFilter =
          !sensorFilters.type || sensorFilters.type === item.unit;
        var searchFilter;
        if (sensorFilters.search === "") {
          searchFilter = true;
        } else {
          const regex = new RegExp(`${sensorFilters.search}`, "i");
          searchFilter =
            !!`${item.unit} ${item.title} ${item.sensorType}`.match(regex);
        }
        return typeFilter && searchFilter;
      })
    );
  }, [sensorFilters, senseboxInfoData]);

  // evaluate data and enhance datamodel
  useEffect(() => {
    setSeconds(0);
    setDispatchInterval(
      senseboxInfoData?.extraData?.dispatchInterval ??
        CONSTANTS.MAX_LIVE_UPDATE_DISPATCH_INTERVAL
    );
    setIsLoading(false);
  }, [senseboxInfoData]);

  return (
    <div className="sbd-live-analytics-container sbd-dashboard-container">
      <LoadingOverlay
        visible={dashboardContext.isLoadingSenseboxInfoData}
        overlayBlur={0.5}
        overlayOpacity={0.5}
        className="sbd-live-analytics-container__loader"
        //loaderProps={{ size: "sm" }}
      />
      {!senseboxInfoData?.data || !filteredSenseboxInfoSensorData ? (
        <NoDataContainer>
          <Text align="center" size="sm" color={"#5c5c5c"}>
            {
              "To display live analytics for a specific Sensebox, you first need to select a Sensebox. You can do so by searching for a Sensebox in the header, or selecting one from your bookmarks!"
            }
          </Text>
          {senseboxMainInfoData?.data && (
            <Button
              variant="default"
              size="xs"
              leftIcon={<Refresh size={14} />}
              onClick={() => {
                refetchSensorData();
              }}
              loading={isLoading}
            >
              Refresh Results
            </Button>
          )}
        </NoDataContainer>
      ) : (
        <>
          <Stack className="sbd-live-analytics-filters">
            <Group position="apart" className="full-width">
              <Group>
                <Popover
                  width={280}
                  //closeOnItemClick={false}
                  position="bottom-start"
                  offset={4}
                  withArrow
                  shadow="lg"
                >
                  <Popover.Target>
                    <Indicator
                      label="!"
                      size={16}
                      color="red"
                      position="middle-end"
                      disabled={isLiveUpdateEnabled}
                      style={{ zIndex: 3 }}
                      withBorder
                    >
                      <Button
                        color="dark.3"
                        size="xs"
                        leftIcon={<FileSettings size={18} />}
                      >
                        Views &amp; Settings
                      </Button>
                    </Indicator>
                  </Popover.Target>

                  <Popover.Dropdown>
                    <Stack spacing="xs">
                      <SegmentedControl
                        onChange={(s) => {
                          setdataView(s);
                        }}
                        defaultValue={dataView}
                        size="xs"
                        data={[
                          {
                            value: "box-view",
                            label: (
                              <Center>
                                <BoxMultiple size={16} />
                                <Box ml={10}>Widget View</Box>
                              </Center>
                            ),
                          },
                          {
                            value: "table-view",
                            label: (
                              <Center>
                                <Table size={16} />
                                <Box ml={10}>Table View</Box>
                              </Center>
                            ),
                          },
                        ]}
                      />
                      <Indicator
                        label="!"
                        size={16}
                        color="red"
                        position="middle-end"
                        disabled={isLiveUpdateEnabled}
                      >
                        <Checkbox
                          label="Stop Live Updates"
                          size="xs"
                          checked={!isLiveUpdateEnabled}
                          onChange={() => {
                            setIsLiveUpdateEnabled((old) => !old);
                          }}
                        />
                      </Indicator>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
                <Popover
                  width={280}
                  position="bottom-start"
                  offset={4}
                  withArrow
                  shadow="lg"
                >
                  <Popover.Target>
                    <Button
                      color="dark.3"
                      size="xs"
                      leftIcon={<TablerIconsFilter size={18} />}
                    >
                      Filters
                    </Button>
                  </Popover.Target>

                  <Popover.Dropdown>
                    <Stack spacing="xs">
                      <TextInput
                        placeholder="Search"
                        radius="xs"
                        //variant="filled"
                        size="sm"
                        withAsterisk
                        value={sensorFilters.search}
                        onChange={(event) => {
                          handleFilters({
                            search: event.currentTarget.value,
                          });
                        }}
                      />
                      <Checkbox
                        label="Show Inactive"
                        size="xs"
                        checked={sensorFilters.showInactive}
                        onChange={(event) =>
                          handleFilters({
                            showInactive: event.currentTarget.checked,
                          })
                        }
                      />
                    </Stack>
                    <Divider
                      my="xs"
                      labelPosition="center"
                      label={
                        <>
                          <Box ml={5}>Types</Box>
                        </>
                      }
                    />
                    {senseboxInfoData?.extraData?.sensorFilters !==
                      undefined && (
                      <Radio.Group
                        name="sensor-filter-types"
                        orientation="vertical"
                        spacing="xs"
                        size="xs"
                        withAsterisk
                        value={
                          sensorFilters.type === sensorFilterDefaultValues.type
                            ? "0"
                            : sensorFilters.type
                        }
                        onChange={(e) => {
                          handleFilters({
                            type:
                              e === "0" ? sensorFilterDefaultValues.type : e,
                          });
                        }}
                      >
                        <Indicator
                          label={senseboxInfoData.data.length}
                          size={16}
                          color="gray"
                          position="middle-end"
                          radius="xs"
                        >
                          <Radio value={"0"} label={"All"} />
                        </Indicator>
                        {Object.keys(
                          senseboxInfoData.extraData.sensorFilters
                        ).map((key, i) => {
                          const e =
                            senseboxInfoData.extraData.sensorFilters[key];
                          const labelText = e.sensors.reduce(
                            (previous, current) =>
                              `${previous}${previous === "" ? "" : "/"}${
                                current.title
                              }`,
                            ""
                          );
                          return (
                            <Tooltip label={labelText} key={i}>
                              <Indicator
                                label={e.totalAmount}
                                size={16}
                                color="gray"
                                position="middle-end"
                                radius="xs"
                              >
                                <Radio
                                  value={e.classifier}
                                  label={capString(
                                    `${e.classifier} | ${labelText}`,
                                    30
                                  )}
                                />
                              </Indicator>
                            </Tooltip>
                          );
                        })}
                      </Radio.Group>
                    )}
                  </Popover.Dropdown>
                </Popover>
                {areFiltersActive && (
                  <Button
                    variant="outline"
                    color="dark"
                    size="xs"
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </Group>
              <Group spacing="xs">
                {sensorFilters.search !== sensorFilterDefaultValues.search &&
                  filterSelection(`Search: ${sensorFilters.search}`, () => {
                    //handleFilters({ search: sensorFilterDefaultValues.search });
                    resetFilters(null, "search");
                  })}
                {sensorFilters.type !== sensorFilterDefaultValues.type &&
                  filterSelection(`Type: ${sensorFilters.type}`, () => {
                    //handleFilters({ type: sensorFilterDefaultValues.type });
                    resetFilters(null, "type");
                  })}
                {sensorFilters.showInactive !==
                  sensorFilterDefaultValues.showInactive &&
                  filterSelection("Only Show Active", () => {
                    resetFilters(null, "showInactive");
                  })}
              </Group>
            </Group>
          </Stack>
          <Divider my="xs" />
          <Text
            size="xs"
            color="dimmed"
            className="sbd-live-analytics-content__table-view__results"
          >{`${filteredSenseboxInfoSensorData.length} of ${senseboxInfoData.data.length} Results`}</Text>
          <Space h="xs" />

          {"box-view" === dataView && (
            <div className="sbd-live-analytics-content__box-view">
              {filteredSenseboxInfoSensorData.map((e, i) => (
                <LiveAnalyticsItem
                  key={i}
                  sensorData={e}
                  liveTime={getLiveUpdateTime(e.lastMeasurementTime)}
                  isLoading={isLoading}
                  view="box-view"
                />
              ))}
            </div>
          )}
          {"table-view" === dataView && (
            <div className="sbd-live-analytics-content__table-view">
              <MantineTable striped verticalSpacing="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Measurement</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSenseboxInfoSensorData.map((e, i) => (
                    <LiveAnalyticsItem
                      key={i}
                      sensorData={e}
                      liveTime={getLiveUpdateTime(e.lastMeasurementTime)}
                      isLoading={isLoading}
                      view="table-view"
                    />
                  ))}
                </tbody>
              </MantineTable>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LiveAnalyticsContainer;
