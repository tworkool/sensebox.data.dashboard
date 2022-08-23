import React from "react";
import { ActionIcon, Badge, Divider, Group, Skeleton, Space, Text, Tooltip } from "@mantine/core";
import { Bookmark, MapPin, ScreenShare } from "tabler-icons-react";
import "./style.scss";

const DashboardBoxInfo = () => {
  return (
    <div className="sbd-dashboard-content__box-info">
          <div>
            <Text size="lg" weight={500}>
              Mein SenseBox Name Hier!!!
            </Text>
            <Text size="xs">ID: 44c69070-21e3-11ed-8ae8-0800200c9a66</Text>
            <Badge color="green" size="sm" radius="sm">
              Outdoor
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
        </div>
  );
};

export default DashboardBoxInfo;
