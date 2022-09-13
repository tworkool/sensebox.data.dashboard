import React, { useCallback } from "react";
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
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import "./style.scss";
import {
  BoxMultiple,
  Filter as TablerIconsFilter,
  X as IconX,
  Table,
  AccessPoint,
} from "tabler-icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSenseboxInfoData } from "../../redux/selectors/appState";
import moment from "moment";
import { useEffect } from "react";
import AnalyticsBoxWidget from "../../components/analytics_box_widget";
import NoDataContainer from "../no_data";
import { capString, getMinuteFormattedString } from "../../utils/helpers";
import CONSTANTS from "../../utils/constants";
import { requestSenseboxInfoDataFetch } from "../../redux/actions/app_state";
import { useMemo } from "react";
import { useContext } from "react";
import { DashboardContext } from "../../pages/dashboard";

const LiveAnalyticsContainer = () => {
  const dispatch = useDispatch();
  const dashboardContext = useContext(DashboardContext);
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(
    () => setSeconds((s) => s + CONSTANTS.LIVE_ANALYTICS_INTERVAL_STEPS),
    CONSTANTS.LIVE_ANALYTICS_INTERVAL_STEPS * 1000
  );
  const [dispatchInterval, setDispatchInterval] = useState(
    CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL
  );
  const [dataView, setdataView] = useState("box-view");
  const [extraSenseboxInfoSensorData, setExtraSenseboxInfoSensorData] =
    useState(undefined);
  const senseboxInfoData = useSelector(getSenseboxInfoData);
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

  useEffect(() => {
    const sensors = senseboxInfoData.data?.sensors;
    if (sensors && sensors.length != 0) {
      interval.start();
    } else {
      interval.stop();
    }
    // stop interval timer on dismount
    return interval.stop;
  }, [interval, senseboxInfoData]);

  useEffect(() => {
    // TODO: ADJUST SECONDS THIS WITH BOX PROPERTY: UPDATED_AT
    if (seconds > dispatchInterval) {
      console.log("REFETCHING SENSEBOX DATA");
      setSeconds(0);
      dispatch(requestSenseboxInfoDataFetch({ id: undefined }));
    }
  }, [dispatch, dispatchInterval, seconds]);

  const filterSelection = (text, handleOnClick) => (
    <Badge
      color="dark"
      radius="sm"
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
    if (!extraSenseboxInfoSensorData) return;
    setFilteredSenseboxInfoSensorData(
      extraSenseboxInfoSensorData.filter((item) => {
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
  }, [sensorFilters, extraSenseboxInfoSensorData]);

  // evaluate data and enhance datamodel
  useEffect(() => {
    const sensors = senseboxInfoData.data?.sensors;
    if (sensors && sensors.length != 0) {
      // reset filters
      setSeconds(0);
      resetFilters();
      // TODO: DO THIS WITH BOX PROPERTY: UPDATED_AT
      var newMinDispatchInterval = CONSTANTS.MAX_LIVE_UPDATE_DISPATCH_INTERVAL;
      var sensorsUpdateFrequently = false;
      const newExtraSensorInfo = sensors.reduce((p, i) => {
        var isDormant = false;
        if (i.lastMeasurement?.value === undefined) isDormant = true;

        if (
          i.lastMeasurement?.createdAt === undefined ||
          moment().diff(moment(i.lastMeasurement.createdAt), "hours") >
            CONSTANTS.SENSEBOX_SENSOR_INACTIVITY_TIME_HOURS
        )
          isDormant = true;

        var lastMeasurementTime = null;
        var lastMeasurementValue = CONSTANTS.DEFAULT_NULL_FALLBACK_VALUE;
        if (!isDormant) {
          lastMeasurementTime = moment().diff(
            moment(i.lastMeasurement.createdAt),
            "seconds"
          );
          lastMeasurementValue = i.lastMeasurement.value;
          if (
            lastMeasurementTime < CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL
          ) {
            // check if updates should be done more frequently
            sensorsUpdateFrequently = true;
          }
          if (
            lastMeasurementTime > CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL &&
            lastMeasurementTime < newMinDispatchInterval
          ) {
            // check if minDispatchTime should be updated
            newMinDispatchInterval = lastMeasurementTime;
          }
        }
        return [
          ...p,
          {
            isDormant,
            lastMeasurementTime,
            lastMeasurementValue,
            title: i.title,
            unit: i.unit,
            _id: i._id,
            sensorType: i.sensorType,
            icon: i.icon,
          },
        ];
      }, []);
      setExtraSenseboxInfoSensorData(newExtraSensorInfo);
      setDispatchInterval(
        sensorsUpdateFrequently
          ? CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL
          : newMinDispatchInterval
      );
    } else {
      setExtraSenseboxInfoSensorData(undefined);
    }
  }, [senseboxInfoData, resetFilters]);

  if (!extraSenseboxInfoSensorData || !filteredSenseboxInfoSensorData) {
    return (
      <div className="sbd-live-analytics-container sbd-dashboard-container">
        <NoDataContainer text="To display live analytics for a specific Sensebox, you first need to select a Sensebox. You can do so by searching for a Sensebox in the header, or selecting one from your bookmarks!" />
      </div>
    );
  }

  return (
    <div className="sbd-live-analytics-container sbd-dashboard-container">
      <Stack className="sbd-live-analytics-filters">
        <Group position="apart" className="full-width">
          <SegmentedControl
            onChange={(s) => {
              setdataView(s);
            }}
            defaultValue={dataView}
            size="xs"
            //color="dark"
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
          <Group>
            <Popover
              width={280}
              //closeOnItemClick={false}
              position="bottom-end"
              offset={4}
              withArrow
              shadow="lg"
            >
              <Popover.Target>
                <Button
                  //variant="default"
                  variant="subtle"
                  color="dark"
                  size="xs"
                  leftIcon={<TablerIconsFilter size={18} />}
                >
                  Filters
                </Button>
              </Popover.Target>

              <Popover.Dropdown>
                {/* <Divider
                  my="xs"
                  labelPosition="center"
                  label={
                    <>
                      <Box ml={5}>General</Box>
                    </>
                  }
                /> */}
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
                {senseboxInfoData?.extraData?.sensorFilters !== undefined && (
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
                        type: e === "0" ? sensorFilterDefaultValues.type : e,
                      });
                    }}
                  >
                    <Indicator
                      label={extraSenseboxInfoSensorData.length}
                      size={16}
                      color="gray"
                      position="middle-end"
                      radius="xs"
                    >
                      <Radio value={"0"} label={"All"} />
                    </Indicator>
                    {Object.keys(senseboxInfoData.extraData.sensorFilters).map(
                      (key, i) => {
                        const e = senseboxInfoData.extraData.sensorFilters[key];
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
                      }
                    )}
                  </Radio.Group>
                )}
              </Popover.Dropdown>
            </Popover>
            <Button
              variant="outline"
              color="dark"
              size="xs"
              onClick={resetFilters}
            >
              Clear Filters
            </Button>
          </Group>
        </Group>
      </Stack>
      <Divider my="xs" />
      <Text
        size="xs"
        color="dimmed"
      >{`${filteredSenseboxInfoSensorData.length} of ${extraSenseboxInfoSensorData.length} Results`}</Text>
      <Space h="xs" />

      {"box-view" === dataView && (
        <div className="sbd-live-analytics-content__box-view">
          {filteredSenseboxInfoSensorData.map((e, i) => (
            <AnalyticsBoxWidget
              key={i}
              sensorData={e}
              liveTime={getLiveUpdateTime(e.lastMeasurementTime)}
            />
          ))}
        </div>
      )}
      {"table-view" === dataView && (
        <div className="sbd-live-analytics-content__table-view">
          <MantineTable striped verticalSpacing="sm">
            <thead>
              <tr>
                <th></th> {/* ICON */}
                <th>Name</th>
                <th>Type</th>
                <th>Measurement</th>
                <th>Unit</th>
                <th></th> {/* Last Measurement at */}
              </tr>
            </thead>
            <tbody>
              {filteredSenseboxInfoSensorData.map((e, i) => (
                <tr key={i}>
                  <td></td>
                  <td>
                    {e.title}
                    {e.isDormant && (
                      <div>
                        <Badge
                          color="red"
                          size="xs"
                          radius="sm"
                          variant="filled"
                        >
                          INACTIVE
                        </Badge>
                      </div>
                    )}
                  </td>
                  <td>{e.sensorType}</td>
                  <td>{e.lastMeasurementValue}</td>
                  <td>{e.unit}</td>
                  <td>
                    <Group spacing="xs">
                      <Text size="xs" weight={600} color="red">
                        {getMinuteFormattedString(
                          getLiveUpdateTime(e.lastMeasurementTime)
                        )}
                      </Text>
                      <AccessPoint
                        size={18}
                        strokeWidth={2}
                        color={"#E20808"}
                      />
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </MantineTable>
        </div>
      )}
    </div>
  );
};

export default LiveAnalyticsContainer;
