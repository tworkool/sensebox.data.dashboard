import React from "react";
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

const LiveAnalyticsContainer = () => {
  const [dataView, setdataView] = useState("box-view");

  return (
    <div className="sbd-live-analytics-container sbd-dashboard-container">
      <Group className="sbd-live-analytics-filters" position="apart">
        <Chip.Group position="center" defaultValue="1" defaultChecked>
          <Indicator label="2" size={16} color="black">
            <Chip value="1" color="dark" size="xs" radius="sm">
              All
            </Chip>
          </Indicator>
          <Indicator label="1" size={16} color="black">
            <Chip value="2" color="dark" size="xs" radius="sm">
              Temperature
            </Chip>
          </Indicator>
          <Indicator label="0" size={16} color="gray">
            <Chip value="3" color="dark" size="xs" radius="sm" disabled>
              Light
            </Chip>
          </Indicator>
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
            <tbody>{/* rows */}</tbody>
          </MantineTable>
        </div>
      )}
    </div>
  );
};

export default LiveAnalyticsContainer;
