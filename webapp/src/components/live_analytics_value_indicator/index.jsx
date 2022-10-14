import { HoverCard, Text } from "@mantine/core";
import React, { useState, useMemo, useCallback } from "react";
import "./style.scss";

const getAirQualityTable = () => {
  return {
    name: "AQI",
    link: "",
    label: "EPA Air Quality Index (AQI)",
    rows: [
      {
        PM10: 54,
        PM25: 12,
        index: 50,
        label: "",
        shortLabel: "Good",
        color: "#79bc6a",
      },
      {
        PM10: 154,
        PM25: 35.4,
        index: 100,
        label: "",
        shortLabel: "Moderate",
        color: "#BBCF4C",
      },
      {
        PM10: 254,
        PM25: 55.4,
        index: 150,
        label: "",
        shortLabel: "Unhealthy for Sensitive Groups",
        color: "#EEC20B",
      },
      {
        PM10: 354,
        PM25: 150.4,
        index: 200,
        label: "",
        shortLabel: "Unhealthy",
        color: "#F29305",
      },
      {
        PM10: 424,
        PM25: 250.4,
        index: 300,
        label: "",
        shortLabel: "Very Unhealthy",
        color: "#E8416F",
      },
      {
        PM10: 604,
        PM25: 500.4,
        index: 500,
        label: "",
        shortLabel: "Hazardous",
        color: "#7E0023",
      },
    ],
  };
};

const calculateAirQualityIndex = (unmappedValue, handleRowSelection) => {
  const mappingProperty = Object.keys(unmappedValue)[0];
  console.log(handleRowSelection);
  var rowIndex = -1;
  const table = getAirQualityTable();
  for (let i = 0; i < table.rows.length; i++) {
    const e = table.rows[i];
    if (
      unmappedValue[mappingProperty] <= e[mappingProperty] ||
      i >= table.rows.length - 1
    ) {
      rowIndex = i;
      handleRowSelection(e);
      break;
    }
  }

  var decimalLowAdjustment = 0;
  if (mappingProperty === "PM10") {
    decimalLowAdjustment = 1;
  } else if (mappingProperty === "PM25") {
    decimalLowAdjustment = 0.1;
  }
  const low =
    rowIndex == 0 ? { PM10: 0, PM25: 0, index: 0 } : table.rows[rowIndex - 1];
  const high = table.rows[rowIndex];
  const I_high = high["index"];
  const I_low = low["index"] + decimalLowAdjustment;
  const C_high = high[mappingProperty];
  const C_low = low[mappingProperty] + decimalLowAdjustment;
  const C = unmappedValue[mappingProperty];
  const AQI_INDEX = ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low;
  return Math.round(AQI_INDEX);
};

const LiveAnalyticsValueIndicator = (props) => {
  const { unmappedValue } = props;
  const [selectedSection, setSelectedSection] = useState();

  const getIndicator = useCallback(() => {
    var rowLabel = "";
    var aqi = calculateAirQualityIndex(unmappedValue, (e) => {
      rowLabel = e.shortLabel;
    });
    const sections = getAirQualityTable().rows;
    const max = sections[sections.length - 1].index;
    const min = 0;
    console.log(aqi);
    if (aqi > max) {
      aqi = max;
    } else if (aqi < min) {
      aqi = min;
    }
    const percentage = Math.floor((aqi / max) * 100);
    /* setSelectedSection({
      aqi,
      rowLabel,
    }); */
    return (
      <div
        className="sbd-live-analytics-value-indicator__indicator"
        style={{ left: `${percentage}%` }}
      />
    );
  }, [unmappedValue]);

  const getColorBar = useCallback(() => {
    const sections = getAirQualityTable().rows;
    var max = sections[sections.length - 1].index;
    sections.forEach((e) => {
      e._percentage = Math.floor((e.index / max) * 100);
    });

    var colors = sections.reduce((p, c) => {
      var currentColor = ` ${c.color} ${c._percentage}%,`;
      return p + currentColor;
    }, "linear-gradient(90deg,");
    colors = colors.slice(0, -1);
    colors += ")";

    return colors;
  }, []);

  return (
    <div className="sbd-live-analytics-value-indicator">
      <HoverCard>
        <HoverCard.Target>
          <div
            className="sbd-live-analytics-value-indicator__bar"
            style={{
              background: getColorBar(),
            }}
          ></div>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm" weight="bold">
            {getAirQualityTable().label}
          </Text>
          {selectedSection && (
            <Text size="sm">
              {`Index ${selectedSection.aqi}, ${selectedSection.rowLabel}`}
            </Text>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
      {getIndicator()}
    </div>
  );
};

export default LiveAnalyticsValueIndicator;
