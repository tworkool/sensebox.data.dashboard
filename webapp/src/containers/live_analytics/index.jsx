import React, { useCallback } from "react";
import {
  Card,
  Text,
  Group,
  Chip,
  Center,
  SegmentedControl,
  Indicator,
  Table as MantineTable,
  Checkbox,
  Divider,
  Box,
  Badge,
  Tooltip,
} from "@mantine/core";
import "./style.scss";
import {
  AccessPoint,
  BoxMultiple,
  Filter,
  Table,
  Temperature,
} from "tabler-icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSenseboxInfoData } from "../../redux/selectors/appState";
import moment from "moment";
import { useEffect } from "react";
import AnalyticsBoxWidget from "../../components/analytics_box_widget";
import NoDataContainer from "../no_data";
import { capString } from "../../utils/helpers";

const LiveAnalyticsContainer = () => {
  const [dataView, setdataView] = useState("box-view");
  const [extraSenseboxInfoSensorData, setExtraSenseboxInfoSensorData] =
    useState(undefined);
  const senseboxInfoData = useSelector(getSenseboxInfoData);
  const [sensorFilters, setSensorFilters] = useState({
    type: null,
  });

  // evaluate data and enhance datamodel
  useEffect(() => {
    // reset filters
    setSensorFilters({ type: null });

    const sensors = senseboxInfoData.data?.sensors;
    if (sensors && sensors.length != 0) {
      setExtraSenseboxInfoSensorData(
        sensors.reduce((p, i) => {
          var isDormant = false;
          if (i.lastMeasurement?.value === undefined) isDormant = true;

          if (
            i.lastMeasurement?.createdAt === undefined ||
            moment().diff(moment(i.lastMeasurement.createdAt), "hours") > 25
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
  }, [senseboxInfoData]);

  const handleFilters = useCallback((actionPayload) => {
    setSensorFilters((old) => ({ ...old, ...actionPayload }));
  }, []);

  if (extraSenseboxInfoSensorData === undefined) {
    return (
      <div className="sbd-live-analytics-container sbd-dashboard-container">
        <NoDataContainer />
      </div>
    );
  }

  return (
    <div className="sbd-live-analytics-container sbd-dashboard-container">
      <Group className="sbd-live-analytics-filters" position="apart">
        <Chip.Group position="center" defaultValue={"0"} defaultChecked>
          {senseboxInfoData?.extraData?.sensorFilters !== undefined && (
            <Indicator
              label={
                Object.keys(senseboxInfoData.extraData.sensorFilters).length
              }
              size={16}
              color="black"
            >
              <Chip
                value={`${0}`}
                color="dark"
                size="xs"
                radius="sm"
                onClick={(_) => {
                  handleFilters({ type: null });
                }}
              >
                All
              </Chip>
            </Indicator>
          )}
          {senseboxInfoData?.extraData?.sensorFilters !== undefined ? (
            Object.keys(senseboxInfoData.extraData.sensorFilters).map(
              (key, i) => {
                const e = senseboxInfoData.extraData.sensorFilters[key];
                const labelText = e.sensors.reduce(
                  (previous, current) =>
                    `${previous}${previous === "" ? "" : "/"}${current.title}`,
                  ""
                );
                return (
                  <Tooltip label={labelText} key={i}>
                    <Indicator label={e.totalAmount} size={16} color="black">
                      <Chip
                        value={`${i + 1}`}
                        color="dark"
                        size="xs"
                        radius="sm"
                        onClick={(_) => {
                          handleFilters({ type: e.classifier });
                        }}
                      >
                        {`${e.classifier} | ${capString(labelText, 12)}`}
                      </Chip>
                    </Indicator>
                  </Tooltip>
                );
              }
            )
          ) : (
            <div>NO FILTERS</div>
          )}
        </Chip.Group>
        <Checkbox label="Show Inactive" size="xs" />
        <SegmentedControl
          onChange={(s) => {
            setdataView(s);
          }}
          defaultValue={dataView}
          size="xs"
          data={[
            {
              value: "table-view",
              label: (
                <Center>
                  <Table size={16} />
                </Center>
              ),
            },
            {
              value: "box-view",
              label: (
                <Center>
                  <BoxMultiple size={16} />
                </Center>
              ),
            },
          ]}
        />
      </Group>
      <Divider
        my="xs"
        labelPosition="center"
        label={
          <>
            <Filter size={16} />
            <Box ml={5}>Filters</Box>
          </>
        }
      />
      {"box-view" === dataView && (
        <div className="sbd-live-analytics-content__box-view">
          {extraSenseboxInfoSensorData
            .filter(
              (item) => !sensorFilters.type || sensorFilters.type === item.unit
            )
            .map((e, i) => (
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
              {extraSenseboxInfoSensorData
                .filter(
                  (item) =>
                    !sensorFilters.type || sensorFilters.type === item.unit
                )
                .map((e, i) => (
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
