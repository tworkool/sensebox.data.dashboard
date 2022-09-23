import { Badge, Card, Divider, Group, LoadingOverlay, Text } from "@mantine/core";
import React from "react";
import { useCallback } from "react";
import { AccessPoint } from "tabler-icons-react";
import { getMinuteFormattedString } from "../../utils/helpers";
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

  const activityBadgeElement = useCallback(() => {
    return sensorData.isDormant ? (
      <div>
        <Badge color="red" size="xs" radius="sm" variant="filled">
          INACTIVE
        </Badge>
      </div>
    ) : null;
  }, [sensorData]);

  return (
    <>
      {"box-view" === view && (
        <div className="sbd-analytics-box-widget-wrapper">
          <div className="sbd-analytics-box-widget-loader" />
          <div
            className={`sbd-analytics-box-widget ${
              sensorData.isDormant ? "sbd-analytics-box-widget--inactive" : ""
            }`}
          >
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
            <Divider />
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
          </div>
        </div>
      )}
      {"table-view" === view && (
        <tr>
          <td>
            {sensorData.title}
            {activityBadgeElement()}
          </td>
          <td>{sensorData.sensorType}</td>
          <td>{sensorData.lastMeasurementValue}</td>
          <td>{sensorData.unit}</td>
          <td>
            <LoadingOverlay
              visible={isLoading}
              transitionDuration={1000}
              overlayOpacity={0.2}
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
