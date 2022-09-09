import { Badge, Card, Group, Text } from "@mantine/core";
import React from "react";
import { AccessPoint, Temperature } from "tabler-icons-react";
import {
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
} from "victory";
import "./style.scss";

const AnalyticsBoxWidget = (props) => {
  const { sensorData } = props;
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
          <>
            <Group spacing="xs">
              <Text size="xs" weight={600} color="red">
                {sensorData.lastMeasurementTime}
              </Text>
              <AccessPoint size={18} strokeWidth={2} color={"#E20808"} />
            </Group>
            <svg>
              <defs>
                <linearGradient
                  id="myGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="95%" stopColor="#3585e5" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
            <VictoryArea
              containerComponent={
                <VictoryContainer responsive={true} height={140} />
              }
              height={140}
              //width="100%"
              padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              style={{
                data: {
                  fill: "url(#myGradient)", //"#c43a31",
                  fillOpacity: 0.7,
                  stroke: "#3585e5",
                  strokeWidth: 10,
                },
              }}
              data={[
                { quarter: 1, earnings: 13000 },
                { quarter: 2, earnings: 16500 },
                { quarter: 3, earnings: 14250 },
                { quarter: 4, earnings: 19000 },
              ]}
              // data accessor for x values
              x="quarter"
              // data accessor for y values
              y="earnings"
            />
          </>
        )}
        <Text size="sm" color="dimmed">
          {sensorData.sensorType}
        </Text>
      </Card.Section>
    </Card>
  );
};

export default AnalyticsBoxWidget;
