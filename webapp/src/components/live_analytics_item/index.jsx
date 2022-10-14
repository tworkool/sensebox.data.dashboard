import {
  Badge,
  Card,
  Group,
  LoadingOverlay,
  Text,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { AccessPoint } from "tabler-icons-react";
import { getMinuteFormattedString } from "../../utils/helpers";
import LiveAnalyticsValueIndicator from "../live_analytics_value_indicator";
import "./style.scss";

const LiveAnalyticsItem = (props) => {
  const { sensorData, view, liveTime, isLoading } = props;

  const liveUpdateTimeElement = useCallback(() => {
    return !sensorData.isDormant ? (
      <Group spacing="xs">
        <Text size="xs" weight={600} color="red">
          {getMinuteFormattedString(liveTime)}
        </Text>
        <AccessPoint size={18} strokeWidth={2} color={"#E20808"} />
      </Group>
    ) : null;
  }, [sensorData, liveTime]);

  const badgeElements = useMemo(() => {
    const activityBadge = sensorData.isDormant ? (
      <div>
        <Badge color="red" size="xs" radius="sm" variant="filled">
          INACTIVE
        </Badge>
      </div>
    ) : null;

    const typeBadge = (
      <Tooltip label={sensorData.sensorType}>
        <Badge color="gray" size="xs" radius="sm" variant="outline">
          {sensorData.sensorType}
        </Badge>
      </Tooltip>
    );

    return {
      activityBadge,
      typeBadge,
    };
  }, [sensorData]);

  return (
    <>
      {"box-view" === view && (
        <div>
          <LoadingOverlay
            visible={isLoading}
            transitionDuration={1000}
            overlayOpacity={0.2}
            overlayBlur={0.5}
            loaderProps={{ color: "dark", variant: "dots" }}
          />

          <Card
            shadow="xs"
            radius="lg"
            p="lg"
            className={`sbd-analytics-box-widget ${
              sensorData.isDormant ? "sbd-analytics-box-widget--inactive" : ""
            }`}
          >
            <Card.Section withBorder inheritPadding py="xs">
              <Group spacing="xs">
                <Text size="xl" weight={500}>
                  {`${sensorData.lastMeasurementValue} ${sensorData.unit}`}
                </Text>
              </Group>
              {!sensorData.isDormant && (
                <>
                  {sensorData.title === "PM10" && (
                    <LiveAnalyticsValueIndicator
                      unmappedValue={{ PM10: sensorData.lastMeasurementValue }}
                    />
                  )}
                  {sensorData.title === "PM2.5" && (
                    <LiveAnalyticsValueIndicator
                      unmappedValue={{ PM25: sensorData.lastMeasurementValue }}
                    />
                  )}
                </>
              )}
              <Group spacing="xs">
                <Text size="md">{sensorData.title}</Text>
                {badgeElements.typeBadge}
              </Group>
            </Card.Section>

            <Card.Section inheritPadding py="xs">
              {liveUpdateTimeElement()}
              {badgeElements.activityBadge}
            </Card.Section>
          </Card>
        </div>
      )}
      {"table-view" === view && (
        <tr>
          <td>
            {sensorData.title}
            {badgeElements.activityBadge}
          </td>
          <td>{badgeElements.typeBadge}</td>
          <td>{`${sensorData.lastMeasurementValue} ${sensorData.unit}`}</td>
          <td>
            <LoadingOverlay
              visible={isLoading}
              transitionDuration={1000}
              overlayOpacity={1}
              overlayBlur={2}
              loaderProps={{ color: "dark", variant: "dots" }}
            />
            {liveUpdateTimeElement()}
          </td>
        </tr>
      )}
    </>
  );
};

export default LiveAnalyticsItem;
