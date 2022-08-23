import React from "react";
import { Card, Text, Group } from "@mantine/core";
import "./style.scss";
import { AccessPoint, Temperature } from "tabler-icons-react";

const LiveAnalyticsContainer = () => {
  return (
    <div className="sbd-live-analytics-container sbd-dashboard-container">
      <div>
        <Card shadow="sm" p="sm" withBorder style={{ width: 320 }}>
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Group spacing="xs">
                <Temperature />
                <Text weight={500}>Sensorname</Text>
              </Group>
              <Group spacing="xs">
                <Text size="xs" weight={600} color="red">
                  3 min ago
                </Text>
                <AccessPoint size={18} strokeWidth={2} color={"#E20808"} />
              </Group>
            </Group>
          </Card.Section>

          <Card.Section inheritPadding py="xs">
            <Text size="sm" color="dimmed">
              Type: HCD134
            </Text>
            <Text size="sm" color="dimmed">
              Unit: °C
            </Text>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
};

export default LiveAnalyticsContainer;
