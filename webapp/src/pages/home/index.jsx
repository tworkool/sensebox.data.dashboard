import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import DashboardPreviewImage from "../../assets/content/dashboard-preview.jpg";
import "./style.scss";
import {
  AccessPoint,
  DeviceDesktopAnalytics,
  MapSearch,
} from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { requestSenseboxDBMiscDataFetch } from "../../redux/actions/app_state";
import { getSenseboxDBMiscData } from "../../redux/selectors/appState";
import { version } from "../../../package.json";

const HomePage = () => {
  const dispatch = useDispatch();
  const senseboxDBMiscData = useSelector(getSenseboxDBMiscData);
  const [isLoadingMiscData, setIsLoadingMiscData] = useState(false);

  useEffect(() => {
    setIsLoadingMiscData(false);
  }, [senseboxDBMiscData]);

  useEffect(() => {
    dispatch(requestSenseboxDBMiscDataFetch());
    setIsLoadingMiscData(true);
  }, [dispatch]);

  return (
    <div className="sbd-home-page">
      <div className="sbd-home-page-copyright">{`Sensebox Data Dashboard version ${version} | © Oliver Tworkowski ${new Date().getFullYear()}`}</div>
      <div className="sbd-page-shape-divider__rest"></div>
      <div className="sbd-page-shape-divider__shape" />
      <Stack
        align="center"
        justify="space-between"
        className="sbd-home-page__content"
      >
        <Container size={1400}>
          <Stack>
            <Stack align="flex-start">
              <Title order={1}>Welcome...</Title>
              <Title order={5}>
                {"To the unofficial data dashboard for "}
                <Anchor href="https://sensebox.de/" target="_blank">
                  Sensebox
                </Anchor>
              </Title>
            </Stack>
            <Group grow>
              <Stack spacing="xl" justify="space-around">
                <Text>
                  With this dashboard you can view the most important sensor
                  data for any Sensebox, presented in a usability friendly way.
                  This project is in its earliest version, so many features are
                  not yet accessible. I hope you find this demo pleasant.
                </Text>

                {senseboxDBMiscData?.data ? (
                  <Group>
                    <div>
                      <Text size="xl" weight={500}>
                        {senseboxDBMiscData.data.registeredBoxes}
                      </Text>
                      <Text size="sm">Registered Senseboxes</Text>
                    </div>
                    <div>
                      <Text size="xl" weight={500}>
                        {senseboxDBMiscData.data.measurementsTotal}
                      </Text>
                      <Text size="sm">Sensor Measurements ...</Text>
                    </div>
                    <div>
                      <Text size="xl" weight={500}>
                        {senseboxDBMiscData.data.measurementsPastHour}
                      </Text>
                      <Text size="sm">... within the Last Hour</Text>
                    </div>
                  </Group>
                ) : (
                  <div style={{ height: 52 }}>
                    <LoadingOverlay visible={isLoadingMiscData} />
                  </div>
                )}
              </Stack>
              <Image
                className="sbd-home-page-preview-image"
                fit="contain"
                width={500}
                radius="md"
                src={DashboardPreviewImage}
                alt="Dashboard Preview"
                withPlaceholder
              />
            </Group>
          </Stack>
        </Container>
        <Center>
          <Button
            color="dark"
            radius="xl"
            size="xl"
            component={Link}
            to="/dashboard"
          >
            Go to Dashboard
          </Button>
        </Center>
        <Container size={1200} className="sbd-home-page__feature-container">
          <Group position="center" grow>
            <Stack align="center" spacing="lg">
              <AccessPoint size={48} />
              <Text align="center">
                Live updates for sensor data to keep track of latest
                measurements
              </Text>
            </Stack>
            <Stack align="center" spacing="lg">
              <DeviceDesktopAnalytics size={48} />
              <Text align="center">
                Detailed analytics with graphs and comparisons and whatnot (soon
                available)
              </Text>
            </Stack>
            <Stack align="center" spacing="lg">
              <MapSearch size={48} />
              <Text align="center">
                Aggregated sensor data from many Senseboxes, displayed on an
                interactive map (soon available)
              </Text>
            </Stack>
          </Group>
        </Container>
      </Stack>
    </div>
  );
};

export default HomePage;
