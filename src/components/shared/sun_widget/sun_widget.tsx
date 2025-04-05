import { Group, Image, LoadingOverlay, Stack, Text } from "@mantine/core";
import SunWidgetWave from "@assets/content/sunwidgetwave.svg";
import ValuePaper from "@components/shared/value_paper/value_paper";
import { Icon } from "@iconify/react";
import "./sun_widget.scss";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { SunriseSunsetService } from "../../../api/services/sunrise_sunset";
import React from "react";
import { OSEM_Response_OneSenseBox_E } from "../../../api/services/boxes";

interface SunWidgetProps {
  senseBox: OSEM_Response_OneSenseBox_E;
}

const SunWidget = (props: SunWidgetProps) => {
  const { senseBox } = props;

  const { data, isPending, refetch } = useQuery({
    queryKey: ["GET_SUNRISE_SUNSET_DATETIMES", senseBox],
    queryFn: async (params) => SunriseSunsetService.getSunriseSunsetDatetimesFromSenseBox(params),
    "refetchOnReconnect": false, // disable for now!
    "refetchOnMount": false,
    "refetchOnWindowFocus": false,
  });

  const localData = useMemo(() => {
    if (!data || !senseBox || !senseBox.timezone) return null;
    return {
      sunrise: dayjs(data.results.sunrise).utc().local().tz(senseBox.timezone),
      sunset: dayjs(data.results.sunset).utc().local().tz(senseBox.timezone),
      noon: dayjs(data.results.solar_noon).utc().local().tz(senseBox.timezone),
      localTime: dayjs().utc().local().tz(senseBox.timezone),
    };
  }, [data, senseBox]);

  const pos = useMemo(() => {
    if (!localData) return {};
    const mappedSin = (x: number) => {
      const a = 0.58; // tweak a = stauchung
      const c = -0.63; // tweak c = verschiebung
      const y = 0.5 * Math.sin((x + c) / a) + 0.5; // 0 to PI = 0 to 1 and back
      return y;
    };

    // Get timestamps for comparison
    const localTime = localData.localTime.valueOf();
    const sunriseTime = localData.sunrise.valueOf();
    const noonTime = localData.noon.valueOf();
    const sunsetTime = localData.sunset.valueOf();

    // Calculate p_x based on current time relative to sun events
    let p_x;
    if (localTime < sunriseTime) {
      // Before sunrise
      p_x = 0;
    } else if (localTime <= noonTime) {
      // Between sunrise and noon
      p_x = ((localTime - sunriseTime) / (noonTime - sunriseTime)) * 50;
    } else if (localTime <= sunsetTime) {
      // Between noon and sunset
      p_x = 50 + ((localTime - noonTime) / (sunsetTime - noonTime)) * 50;
    } else {
      // After sunset
      p_x = 100;
    }

    const x = (Math.PI) * (p_x / 100);
    const heightFactor = 0.92; // tweak b = height
    const p_y = mappedSin(x) * (100 * heightFactor);

    /* // day indicator
    var dayLinePos;
    if (localTime < noonTime){
      dayLinePos = mappedSin()
    } else {

    } */
    return {
      sunIndicator: {
        left: `${p_x}%`,
        bottom: `${p_y}%`,
      },
      dayIndicator: {

      }
    };
  }, [localData]);

  if (!senseBox || !senseBox.timezone) {
    console.warn("Could not load sun widget data, missing timezone in senseBox");
    return null;
  }

  return (
    <ValuePaper.Bare className="sun-widget" subtitle="Sunrise & Sunset">
      <Stack pb="md" gap="md">
        <Group gap="xs" justify="space-around">
          <Stack align="center" gap="0.2rem">
            <Icon icon="mdi:weather-sunset-up" width="2rem" height="2rem" />
            <Text ff="Satoshi-Black" size="1.7rem">{
              (localData) ? localData.sunrise.format("HH:mm") : "--:--"
            }</Text>
            <Text ff="Satoshi-Light" size="0.8rem">{
              (localData) ? localData.sunrise.fromNow() : ""
            }</Text>
          </Stack>
          <Stack align="center" gap="0.2rem">
            <Icon icon="mdi:weather-sunset-down" width="2rem" height="2rem" />
            <Text ff="Satoshi-Black" size="1.7rem">{
              (localData) ? localData.sunset.format("HH:mm") : "--:--"
            }</Text>
            <Text ff="Satoshi-Light" size="0.8rem">{
              (localData) ? localData.sunset.fromNow() : ""
            }</Text>
          </Stack>
        </Group>
        <div>
          <Image
            src={SunWidgetWave}
            alt="sun widget wave"
            width={"100%"}
            height={100}
          />
          <div className="sun-widget__sun-indicator" style={pos.sunIndicator}></div>
          {/* {new Array(24).fill(0).map((_, i) => {
            const a = 0.58; // tweak a = stauchung
            const b = 0.92; // tweak b = height
            const c = -0.63; // tweak c = verschiebung
            // calc percentage of current hour
            const p_x = (100 / 24) * i;
            const x = (Math.PI) * (p_x / 100);
            const y = 0.5 * Math.sin((x + c) / a) + 0.5; // 0 to PI = 0 to 1 and back
            const p_y = y * (100 * b);
            return (
              <div key={i} className="sun-widget-test" style={{ left: `${p_x}%`, bottom: `${p_y}%` }}></div>
            );
          })} */}
          {/* <div className="sun-widget__twilight-indicator" style={pos.}></div> */}
        </div>
      </Stack>

      <Stack align="center" gap="0.2rem" style={{ position: "absolute", bottom: "1rem", left: 0, right: 0 }}>
        <Text ff="Satoshi-Black" size="1.7rem">{
          (localData) ? localData.localTime.format("HH:mm") : "--:--"
        }</Text>
        <Text ff="Satoshi-Light" size="0.8rem">local time</Text>
      </Stack>

      <LoadingOverlay visible={isPending} />
    </ValuePaper.Bare>
  );
};

export default React.memo(SunWidget);
