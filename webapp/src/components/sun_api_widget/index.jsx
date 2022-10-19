import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AccessPoint, Sunrise, Sunset } from "tabler-icons-react";
import QUERY_DATA_MODIFIERS from "../../redux/sagas/api/query_data_modifiers";
import { getSunApiData } from "../../redux/selectors/appState";
import moment from "moment";
import "./style.scss";

const SunApiWidget = (props) => {
  const sunApiData = useSelector(getSunApiData);
  const [aggregatedSunApiData, setAggregatedSunApiData] = useState();

  useEffect(() => {
    if (!sunApiData?.data) return;
    const aggregatedData = QUERY_DATA_MODIFIERS.aggregateSunApiData(
      sunApiData.data
    );
    console.log(aggregatedData);
    setAggregatedSunApiData(aggregatedData);
  }, [sunApiData]);

  if (!aggregatedSunApiData) return null;

  return (
    <Card shadow="xs" radius="lg" p="lg">
      <Card.Section withBorder inheritPadding py="xs">
        <Group spacing="xs">
          {/*  <Temperature /> */}
          <Text size="xl" weight={500}>
            Sunset/Sunrise Times
          </Text>
          <Text size="xs" color={"dimmed"}>
            More Info on https://sunrise-sunset.org/
          </Text>
        </Group>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="xs">
        <div className="sbd-sun-api-widget__data-grid">
          <div>
            <Group spacing="xs">
              <Text weight={500}>Sunrise</Text>
              <Sunrise size={20} strokeWidth={2} color={"black"} />{" "}
            </Group>
            <Text>{aggregatedSunApiData.sunrise.format("LTS")}</Text>
            <Text size={"sm"} color="dimmed">
              {aggregatedSunApiData.sunrise.fromNow()}
            </Text>
          </div>
          <div>
            <Group spacing="xs">
              <Text weight={500}>Sunset</Text>
              <Sunset size={20} strokeWidth={2} color={"black"} />
            </Group>
            <Text>{aggregatedSunApiData.sunset.format("LTS")}</Text>
            <Text size={"sm"} color="dimmed">
              {aggregatedSunApiData.sunset.fromNow()}
            </Text>
          </div>
        </div>
      </Card.Section>

      <Card.Section inheritPadding py="xs">
        <Group spacing="xs">
          <Text size="xs" weight={600} color="red">
            Today
          </Text>
          <AccessPoint size={18} strokeWidth={2} color={"#E20808"} />
        </Group>
      </Card.Section>
    </Card>
  );
};

export default SunApiWidget;
