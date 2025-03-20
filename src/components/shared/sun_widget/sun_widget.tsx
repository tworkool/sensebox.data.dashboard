import { Group, Image, Stack, Text } from "@mantine/core";
import SunWidgetWave from "@assets/content/sunwidgetwave.svg";
import ValuePaper from "@components/shared/value_paper/value_paper";
import { Icon } from "@iconify/react";
import "./sun_widget.scss";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

const SunWidget = (props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentDate(old => old.add(1, "hour"));
      }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const pos = useMemo(() => {
    const a = 0.94; // tweak a = stauchung
    const b = 0.85; // tweak b = height
    const c = 0; // tweak c = verschiebung
    // calc percentage of current hour
    const p_x = (100 / 24) * currentDate.hour();
    const x = (Math.PI) * (p_x / 100);
    const y = Math.sin((x + c) / a); // 0 to PI = 0 to 1 and back
    const p_y = y * (100 * b);
    console.log(currentDate.format("HH:mm"), x, y, p_y);
    return {
      left: `${p_x}%`,
      bottom: `${p_y}%`,
    };
  }, [currentDate]);

  return (
    <ValuePaper.Bare className="sun-widget" subtitle="Sunrise & Sunset">
      <Stack pb="md" gap="md">
        <Group gap="xs" justify="space-around">
          <Stack align="center" gap="0.2rem">
            <Icon icon="mdi:weather-sunset-down" width="2rem" height="2rem" />
            <Text ff="Satoshi-Black" size="1.7rem">10:30</Text>
            <Text ff="Satoshi-Light" size="0.8rem">in 2 hours</Text>
          </Stack>
          <Stack align="center" gap="0.2rem">
            <Icon icon="mdi:weather-sunset-up" width="2rem" height="2rem" />
            <Text ff="Satoshi-Black" size="1.7rem">10:30</Text>
            <Text ff="Satoshi-Light" size="0.8rem">in 2 hours</Text>
          </Stack>
        </Group>
        <div>
          <Image
            src={SunWidgetWave}
            alt="sun widget wave"
            width={"100%"}
            height={100}
          />
          <div className="sun-widget__sun-indicator" style={pos}></div>
        </div>
      </Stack>

      <Stack align="center" gap="0.2rem" style={{ position: "absolute", bottom: "1rem", left: 0, right: 0 }}>
        <Text ff="Satoshi-Black" size="1.7rem">{currentDate.format("HH:mm")}</Text>
        <Text ff="Satoshi-Light" size="0.8rem">local time</Text>
      </Stack>
    </ValuePaper.Bare>
  );
};

export default SunWidget;
