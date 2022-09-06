import { Center, Group, Text } from "@mantine/core";
import React from "react";
import { SearchOff } from "tabler-icons-react";
import "./style.scss";

const NoDataContainer = () => {
  return (
    <div className="sbd-no-data">
      <Center>
        <Group>
          <SearchOff size={32} strokeWidth={1.5} color={"#5c5c5c"} />
          <Text size="xl" color={"#5c5c5c"}>
            No Results
          </Text>
        </Group>
      </Center>
    </div>
  );
};

export default NoDataContainer;
