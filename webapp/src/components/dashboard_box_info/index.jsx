import React from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Divider,
  Group,
  Skeleton,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { AlertCircle, Bookmark, MapPin, ScreenShare } from "tabler-icons-react";
import "./style.scss";
import { useSelector } from "react-redux";
import { getSenseboxInfoData } from "../../redux/selectors/appState";

const DashboardBoxInfo = () => {
  const senseboxInfoData = useSelector(getSenseboxInfoData);

  return (
    <div className="sbd-dashboard-content__box-info">
      {!senseboxInfoData.data && (
        <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
          Something terrible happened! You made a mistake and there is no going
          back, your data was lost forever!
        </Alert>
      )}
      {senseboxInfoData.data && (
        <>
          <div>
            <Text size="lg" weight={500}>
              {senseboxInfoData.data.name}
            </Text>
            <Text size="xs" color="dimmed">
              {senseboxInfoData.data._id}
            </Text>
            <Badge color="green" size="sm" radius="sm">
              {senseboxInfoData.data.exposure}
            </Badge>
          </div>
          <Divider my="sm" label="Position" labelPosition="center" />
          <Skeleton height={100} visible={true}>
            https://deck.gl/#/
          </Skeleton>
          <Space h="xs" />
          <Skeleton visible={false}>
            <Group spacing="xs">
              <MapPin size={18} strokeWidth={1.5} color={"black"} />
              <Text size="sm">Berlin, Germany</Text>
            </Group>
          </Skeleton>
          <Divider my="sm" label="Images" labelPosition="center" />
          <Skeleton height={100} visible={true}>
            No Images Found
          </Skeleton>
          <div style={{ marginTop: "auto" }}>
            <Divider
              my="sm"
              label="Actions"
              labelPosition="center"
              style={{ marginTop: "auto" }}
            />
            <Group spacing="xs">
              <Tooltip label="Add to Bookmarks">
                <ActionIcon size="lg">
                  <Bookmark color="orange" size={26} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="View Box on Opensensemap">
                <ActionIcon size="lg">
                  <ScreenShare size={26} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardBoxInfo;
