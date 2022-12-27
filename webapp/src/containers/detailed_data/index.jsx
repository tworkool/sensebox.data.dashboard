import {
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  Paper,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, GitCompare } from "tabler-icons-react";
import {
  getSenseboxSensorData,
  getSenseboxSensorLatestMeasurements,
} from "../../redux/selectors/appState";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CONSTANTS from "../../utils/constants";
import "./style.scss";
import { useEffect } from "react";
import { requestSenseboxSensorLatestMeasurementsDataFetch } from "../../redux/actions/app_state";
import { stringToColor } from "../../utils/helpers";

const relativeTimeOptions = [
  {
    id: 1,
    label: "Select Timeframe",
    options: [
      { id: 10, label: "past 4h", momentData: { att: "h", delta: 4 } },
      { id: 11, label: "past 12h", momentData: { att: "h", delta: 12 } },
      { id: 12, label: "past 24h", momentData: { att: "h", delta: 24 } },
      { id: 13, label: "today", momentData: { att: "d", delta: 0 } },
      { id: 14, label: "past 2 days", momentData: { att: "d", delta: 2 } },
      { id: 15, label: "past 7 days", momentData: { att: "d", delta: 7 } },
    ],
  },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null;
    return (
      <div className="area-chart-tooltip">
        <p>
          {currData
            ? moment(currData.momentEpochUnix).format("DD/MM/YY HH:mm")
            : " -- "}
        </p>
        <p>
          {currData && Object.keys(currData).map((k, i) => {
            if (k === "momentEpochUnix") return null;
            const item = currData[k];
            return (
              <div key={i}>
                <span>{`${k} : `}</span>
                <em>{currData ? item : " -- "}</em>
              </div>
            );
          })}
        </p>
      </div>
    );
  }

  return null;
};

const DetailedDataContainer = () => {
  const dispatch = useDispatch();
  const latestSenseboxMeasurements = useSelector(
    getSenseboxSensorLatestMeasurements
  );
  const senseboxSensorData = useSelector(getSenseboxSensorData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [selectedRelativeTime, setSelectedRelativeTime] = useState(
    relativeTimeOptions[0].options[3]
  );
  const [endDate, setEndDate] = useState(moment());
  const [startDate, setStartDate] = useState(
    moment(endDate).subtract(
      selectedRelativeTime.momentData.delta,
      selectedRelativeTime.momentData.att
    )
  );
  const preparedSenseboxSensorData = useMemo(
    () =>
      senseboxSensorData?.data?.reduce(
        (p, c) => [
          ...p,
          {
            label: c.title,
            value: {
              color: stringToColor(c.title),
              unit: c.unit,
              _id: c._id,
            },
          },
        ],
        []
      ) ?? [],
    [senseboxSensorData]
  );
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (selectedSensors.length > 0) {
      setIsLoading(true);
      selectedSensors.forEach((e) => {
        dispatch(
          requestSenseboxSensorLatestMeasurementsDataFetch({
            sensorId: e._id,
            fromDate: startDate,
            toDate: endDate,
          })
        );
      });
    }
  }, [startDate, endDate, selectedSensors, dispatch]);

  useEffect(() => {
    if (
      latestSenseboxMeasurements?.data &&
      Object.keys(latestSenseboxMeasurements.data).length > 0
    ) {
      const sensorId = Object.keys(latestSenseboxMeasurements.data)[0];
      const transformedData = latestSenseboxMeasurements.data[sensorId].reduce(
        (p, c) => {
          return [
            ...p,
            {
              momentEpochUnix: c?.createdAt
                ? moment(c.createdAt, CONSTANTS.OSEM_DATE_FORMAT).valueOf()
                : null,
              [sensorId]: c?.value,
            },
          ];
        },
        []
      );
      setGraphData(transformedData);
    } else {
      setGraphData([]);
    }
    setIsLoading(false);
  }, [latestSenseboxMeasurements]);

  const handleRelativeTimeSelect = useCallback((e) => {
    setSelectedRelativeTime(e);
    const _endDate = moment();
    setStartDate(
      moment(_endDate).subtract(e.momentData.delta, e.momentData.att)
    );
    setEndDate(_endDate);
  }, []);

  return (
    <div className="sbd-detailed-data-container sbd-dashboard-container">
      <div className="sbd-dashboard-filters">
        <Popover
          width={320}
          position="bottom-start"
          offset={4}
          withArrow
          shadow="lg"
        >
          <Popover.Target>
            <Button
              color="dark.3"
              variant="default"
              size="xs"
              leftIcon={<Calendar size={18} />}
            >
              {`${startDate.format(CONSTANTS.DATE_FORMAT)} - ${endDate.format(
                CONSTANTS.DATE_FORMAT
              )}`}
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Group>
              <div className="sbd-detailed-data-relative-time-container__section">
                {relativeTimeOptions.map((section) => (
                  <React.Fragment key={section.id}>
                    <Text weight={500} mb="sm" size="sm">
                      {section.label}
                    </Text>
                    {section.options.map((option) => (
                      <UnstyledButton
                        key={option.id}
                        onClick={() => {
                          handleRelativeTimeSelect(option);
                        }}
                      >
                        <Text
                          size="sm"
                          underline={option.id === selectedRelativeTime.id}
                          color={
                            option.id === selectedRelativeTime.id
                              ? "blue"
                              : "black"
                          }
                        >
                          {option.label}
                        </Text>
                      </UnstyledButton>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </Group>
          </Popover.Dropdown>
        </Popover>
        <Group>
          <MultiSelect
            size="xs"
            data={preparedSenseboxSensorData}
            placeholder="Pick all that you like"
            onChange={setSelectedSensors}
            maxSelectedValues={2}
          />
          <Button color="blue" size="xs" rightIcon={<GitCompare size={18} />}>
            Compare
          </Button>
        </Group>
      </div>
      <Paper shadow="xs" p="xs" className="sbd-detailed-data-graph-container">
        <LoadingOverlay visible={isLoading} overlayBlur={0.4} />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            /* width={500}
            height={300} */
            data={graphData}
            /* margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }} */
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="momentEpochUnix"
              scale="time"
              type="number"
              domain={[startDate.valueOf(), endDate.valueOf()]}
              tickFormatter={(d) => moment(d).format("DD/MM/YY HH:mm")}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            {selectedSensors.map((e, i) => (
              <Line key={i} type="monotone" dataKey={e._id} stroke={e.color} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

export default DetailedDataContainer;
