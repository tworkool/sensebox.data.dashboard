import { Badge, Card, Group, Text } from "@mantine/core";
import React from "react";
import { AccessPoint, Temperature } from "tabler-icons-react";
import { getMinuteFormattedString } from "../../utils/helpers";
import "./style.scss";

const AnalyticsBoxWidget = (props) => {
  const { sensorData, liveTime } = props;
  return (
    <Card
      shadow="xs"
      radius="lg"
      p="lg"
      className={`sbd-analytics-box-widget ${
        sensorData.isDormant ? "sbd-analytics-box-widget--inactive" : ""
      }`}
    >
      <Card.Section withBorder inheritPadding py="xs">
        {sensorData.isDormant && (
          <Badge color="red" size="xs" radius="sm" variant="filled">
            INACTIVE
          </Badge>
        )}
        <Group spacing="xs">
          {/*  <Temperature /> */}
          <Text size="xl" weight={500}>
            {`${sensorData.lastMeasurementValue} ${sensorData.unit}`}
          </Text>
        </Group>
        <Text size="md">{sensorData.title}</Text>
      </Card.Section>

      <Card.Section inheritPadding py="xs">
        {!sensorData.isDormant && (
          <Group spacing="xs">
            <Text size="xs" weight={600} color="red">
              {getMinuteFormattedString(liveTime)}
            </Text>
            <AccessPoint size={18} strokeWidth={2} color={"#E20808"} />
          </Group>
        )}
        <Text size="sm" color="dimmed">
          {sensorData.sensorType}
        </Text>
      </Card.Section>
    </Card>
  );
};

export default AnalyticsBoxWidget;
