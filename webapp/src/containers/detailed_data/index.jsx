import {
  Button,
  Group,
  MultiSelect,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Calendar, CalendarEvent, GitCompare } from "tabler-icons-react";
import { getSenseboxSensorData } from "../../redux/selectors/appState";
import CONSTANTS from "../../utils/constants";
import "./style.scss";

const relativeTimeOptions = [
  {
    id: 1,
    label: "Days",
    options: [
      { id: 11, label: "past 24h", momentData: { att: "h", delta: 24 } },
      { id: 12, label: "today", momentData: { att: "d", delta: 0 } },
      {
        id: 13,
        label: "yesterday and today",
        momentData: { att: "d", delta: 1 },
      },
      { id: 14, label: "past 7 days", momentData: { att: "d", delta: 7 } },
      { id: 15, label: "past 30 days", momentData: { att: "d", delta: 30 } },
      { id: 16, label: "past 60 days", momentData: { att: "d", delta: 60 } },
      { id: 17, label: "past 365 days", momentData: { att: "d", delta: 365 } },
    ],
  },
];

const DetailedDataContainer = () => {
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
  const senseboxSensorData = useSelector(getSenseboxSensorData);
  const preparedSenseboxSensorData = useMemo(
    () =>
      senseboxSensorData?.data?.reduce(
        (p, c) => [...p, { label: c.title, value: c._id }],
        []
      ) ?? [],
    [senseboxSensorData]
  );

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
          />
          <Button color="blue" size="xs" rightIcon={<GitCompare size={18} />}>
            Compare
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default DetailedDataContainer;
