import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Image,
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

const HomePage = () => {
  return (
    <div className="sbd-home-page">
      <div className="sbd-home-page-copyright">{`© Oliver Tworkowski ${new Date().getFullYear()}`}</div>
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
                  SenseBox
                </Anchor>
              </Title>
            </Stack>
            <Group grow>
              <Text>
                pharetra pharetra massa massa ultricies mi. Sagittis vitae et
                leo duis. Viverra vitae congue eu consequat. Non quam lacus
                suspendisse faucibus interdum posuere lorem ipsum. Diam sit amet
                nisl suscipit adipiscing bibendum est. Arcu cursus vitae congue
                mauris rhoncus. Non consectetur a erat nam at lectus urna. A
                condimentum vitae sapien pellentesque habitant. Aliquam eleifend
                mi in nulla. Morbi leo urna molestie at. Dictum varius duis at
                consectetur lorem donec massa sapien faucibus. Venenatis a
                condimentum vitae sapien pellentesque habitant morbi tristique
                senectus. Sit amet porttitor eget dolor morbi non. Est
                ullamcorper eget nulla facilisi etiam dignissim diam. Et
                malesuada fames ac turpis egestas maecenas pharetra convallis.
                Scelerisque eu ultrices vitae auctor eu augue ut
              </Text>
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
                eget nulla facilisi etiam dignissim diam. Et malesuada fames ac
                turpis egestas maecenas pharetra convallis. Scelerisque eu
                ultrices vitae auctor eu augue ut
              </Text>
            </Stack>
            <Stack align="center" spacing="lg">
              <DeviceDesktopAnalytics size={48} />
              <Text align="center">
                eget nulla facilisi etiam dignissim diam. Et malesuada fames ac
                turpis egestas maecenas pharetra convallis. Scelerisque eu
                ultrices vitae auctor eu augue ut
              </Text>
            </Stack>
            <Stack align="center" spacing="lg">
              <MapSearch size={48} />
              <Text align="center">
                eget nulla facilisi etiam dignissim diam. Et malesuada fames ac
                turpis egestas maecenas pharetra convallis. Scelerisque eu
                ultrices vitae auctor eu augue ut
              </Text>
            </Stack>
          </Group>
        </Container>
      </Stack>
    </div>
  );
};

export default HomePage;
