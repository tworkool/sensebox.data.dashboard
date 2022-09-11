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
import "./style.scss";
import {
  BoxMultiple,
  Filter as TablerIconsFilter,
  X as IconX,
  Table,
} from "tabler-icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSenseboxInfoData } from "../../redux/selectors/appState";
import moment from "moment";
import { useEffect } from "react";
import AnalyticsBoxWidget from "../../components/analytics_box_widget";
import NoDataContainer from "../no_data";
import { capString } from "../../utils/helpers";
import CONSTANTS from "../../utils/constants";
import { useMemo } from "react";

const LiveAnalyticsContainer = () => {
  const [dataView, setdataView] = useState("box-view");
  const [extraSenseboxInfoSensorData, setExtraSenseboxInfoSensorData] =
    useState(undefined);
  const senseboxInfoData = useSelector(getSenseboxInfoData);
  const [sensorFilters, setSensorFilters] = useState({
    type: null,
    showInactive: true,
    search: "",
  });
  const [filteredSenseboxInfoSensorData, setFilteredSenseboxInfoSensorData] =
    useState(undefined);

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

  const resetFilters = useCallback(() => {
    setSensorFilters({ type: null, showInactive: true, search: "" });
  }, []);

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
          /* searchFilter = `${item.unit} ${item.title}`.includes(
            sensorFilters.search
          ); */
          const regex = new RegExp(`${sensorFilters.search}`, "i");
          searchFilter = !!`${item.unit} ${item.title}`.match(regex);
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
      resetFilters();
      setExtraSenseboxInfoSensorData(
        sensors.reduce((p, i) => {
          var isDormant = false;
          if (i.lastMeasurement?.value === undefined) isDormant = true;

          if (
            i.lastMeasurement?.createdAt === undefined ||
            moment().diff(moment(i.lastMeasurement.createdAt), "hours") >
              CONSTANTS.SENSEBOX_SENSOR_INACTIVITY_TIME_HOURS
          )
            isDormant = true;

          var lastMeasurementTime = "-";
          var lastMeasurementValue = "-";
          if (!isDormant) {
            const lastMeasurementTimeMinutes = moment().diff(
              moment(i.lastMeasurement.createdAt),
              "minutes"
            );
            lastMeasurementTime =
              lastMeasurementTimeMinutes == 0
                ? "less than 1 minute"
                : `${lastMeasurementTimeMinutes} minute(s) ago`;
            lastMeasurementValue = i.lastMeasurement.value;
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
        }, [])
      );
    }
  }, [senseboxInfoData, resetFilters]);

  if (!filteredSenseboxInfoSensorData) {
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
            {sensorFilters.search !== "" &&
              filterSelection(`Search: ${sensorFilters.search}`, () => {
                handleFilters({ search: "" });
              })}
            {sensorFilters.type !== null &&
              filterSelection(`Type: ${sensorFilters.type}`, () => {
                handleFilters({ type: null });
              })}
            {!sensorFilters.showInactive &&
              filterSelection("Only Show Active", () => {
                handleFilters({ showInactive: true });
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
                      sensorFilters.type === null ? "0" : sensorFilters.type
                    }
                    onChange={(e) => {
                      handleFilters({ type: e === "0" ? null : e });
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
            <AnalyticsBoxWidget key={i} sensorData={e} />
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
                  <td>{e.lastMeasurementTime}</td>
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
