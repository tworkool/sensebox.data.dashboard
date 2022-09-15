import { Center, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { SearchOff } from "tabler-icons-react";
import "./style.scss";

const NoDataContainer = (props) => {
  return (
    <div className="sbd-no-data">
      <Center>
        <Stack align="center">
          <Group>
            <SearchOff size={32} strokeWidth={1.5} color={"#5c5c5c"} />
            <Text size="xl" color={"#5c5c5c"}>
              No Results
            </Text>
          </Group>
          {props.children}
        </Stack>
      </Center>
    </div>
  );
};

export default NoDataContainer;
