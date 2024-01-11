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
import posthog from "posthog-js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { requestSenseboxDBMiscDataFetch } from "../../redux/actions/app_state";
import { getSenseboxDBMiscData } from "../../redux/selectors/appState";
import { version } from "../../../package.json";
import CONSTANTS from "../../utils/constants";
import Header from "../../components/header";
import Footer from "../../components/footer";

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
    <div className="page__container">
      <Header/>
      <div className="page__content">
       
        {/* <div className="sbd-home-page-copyright">{`Sensebox Data Dashboard version ${version} | © Oliver Tworkowski ${new Date().getFullYear()}`}</div> */}
        {/* <div className="sbd-page-shape-divider__rest"></div>
        <div className="sbd-page-shape-divider__shape" /> */}
        <Stack
          align="center"
          justify="space-between"
          className="sbd-home-page__content"
        >
          <Container size={1400}>
            <Stack>
              <Stack align="flex-start">
                <Title order={1}>Welcome...</Title>
                <Title order={2}>
                  {"To the unofficial data dashboard for "}
                  <Anchor href="https://sensebox.de/" target="_blank">
                  Sensebox
                  </Anchor>
                </Title>
              </Stack>
              <div className="sbd-home-info">
                <div className="sbd-home-info__stack">
                  <Text>
                  With this dashboard you can view the most important sensor
                  data for any Sensebox, presented in a usability friendly way.
                  This project is in its earliest version, so many features are
                  not yet accessible. I hope you find this demo pleasant.
                  </Text>

                  {senseboxDBMiscData?.data ? (
                    <div className="sbd-home-info__stack__data">
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
                    </div>
                  ) : (
                    <div style={{ height: 52 }}>
                      <LoadingOverlay visible={isLoadingMiscData} />
                    </div>
                  )}
                </div>
                <Image
                  className="sbd-home-page-preview-image"
                  fit="contain"
                  radius="md"
                  src={DashboardPreviewImage}
                  alt="Dashboard Preview"
                  withPlaceholder
                />
              </div>
            </Stack>
          </Container>
          <div className="sbd-dashboard-btn-container">
            <Center>
              <Button
                color="dark"
                radius="xl"
                size="xl"
                component={Link}
                to="dashboard"
                onClick={() =>
                  posthog.capture(
                    "Click on button: change page from Landingpage to dashboard",
                    { property: "-" }
                  )
                }
              >
              Go to Dashboard
              </Button>
            </Center>
          </div>
          <Container size={1200} className="sbd-home-feature-container">
            <div className="sbd-home-feature-container__group">
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
            </div>
          </Container>
        </Stack>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
