import { HoverCard, Text } from "@mantine/core";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./style.scss";

const getAirQualityTable = () => {
  return {
    name: "AQI",
    link: "",
    label: "EPA Air Quality Index (AQI) for last measured value",
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

const getLumenTable = () => {
  return {
    name: "Light (lx)",
    link: "https://en.wikipedia.org/wiki/Lux#Illuminance",
    label: "Light",
    rows: [
      {
        LIGHT: 0.002,
        index: 0.002,
        label: "",
        shortLabel: "Moonless night, starlight",
        color: "#03051c",
      },
      {
        LIGHT: 0.3,
        index: 0.3,
        label: "",
        shortLabel: "Night with bright moon",
      },
      {
        LIGHT: 3.4,
        index: 3.4,
        label: "",
        shortLabel: "Dark limit of civil twilight under a clear sky",
      },
      {
        LIGHT: 20,
        index: 20,
        label: "",
        shortLabel: "Darkness with very little light",
      },
      {
        LIGHT: 50,
        index: 50,
        label: "",
        shortLabel: "living room lights",
      },
      {
        LIGHT: 80,
        index: 80,
        label: "",
        shortLabel: "Office building hallway/toilet lighting",
      },
      {
        LIGHT: 100,
        index: 100,
        label: "",
        shortLabel: "Very dark overcast day",
      },
      {
        LIGHT: 150,
        index: 150,
        label: "",
        shortLabel: "Train station platforms",
      },
      {
        LIGHT: 500,
        index: 500,
        label: "",
        shortLabel: "Office/desk lighting or sunrise/sunset on a clear day",
      },
      {
        LIGHT: 1000,
        index: 1000,
        label: "",
        shortLabel: "Overcast day or typical TV studio lighting",
      },
      {
        LIGHT: 10000,
        index: 10000,
        label: "",
        shortLabel: "Overcast day to full daylight",
      },
      {
        LIGHT: 25000,
        index: 25000,
        label: "",
        shortLabel: "Full daylight",
        color: "#af8f22",
      },
      {
        LIGHT: 100000,
        index: 100000,
        label: "",
        shortLabel: "Direct sunlight",
      },
      {
        LIGHT: 220000,
        index: 220000,
        label: "",
        shortLabel: "Very bright direct sunlight",
        color: "#fff2af",
      },
    ],
  };
};

const calculateAirQualityIndex = (unmappedValue, handleRowSelection) => {
  const mappingProperty = Object.keys(unmappedValue)[0];
  var rowIndex = -1;
  const table = getAirQualityTable();
  for (let i = 0; i < table.rows.length; i++) {
    const e = table.rows[i];
    if (
      unmappedValue[mappingProperty] <= e[mappingProperty] ||
      i >= table.rows.length - 1
    ) {
      rowIndex = i;
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
  var AQI_INDEX = ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low;
  AQI_INDEX = Math.round(AQI_INDEX);
  handleRowSelection(`Index ${AQI_INDEX}, ${high.shortLabel} Airquality`);
  return AQI_INDEX;
};

const calculateLumenIndex = (unmappedValue, handleRowSelection) => {
  const mappingProperty = Object.keys(unmappedValue)[0];
  var rowIndex = -1;
  const table = getLumenTable();
  for (let i = 0; i < table.rows.length; i++) {
    const e = table.rows[i];
    if (
      unmappedValue[mappingProperty] <= e[mappingProperty] ||
      i >= table.rows.length - 1
    ) {
      rowIndex = i;
      break;
    }
  }
  const rowItem = table.rows[rowIndex];
  handleRowSelection(`${rowItem.shortLabel}`);
  return rowItem["index"];
};

const LiveAnalyticsValueIndicator = (props) => {
  const { unmappedValue } = props;
  const [selectedSectionDescription, setSelectedSectionDescription] =
    useState();
  const [indicatorBarStyle, setIndicatorBarStyle] = useState({});
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const _valueInfo = useMemo(() => {
    if (!unmappedValue) return;
    const mappingProperty = Object.keys(unmappedValue)[0];
    if (mappingProperty === "PM10" || mappingProperty === "PM25") {
      return {
        value: { ...unmappedValue }[mappingProperty],
        mappingProperty,
        table: getAirQualityTable(),
        function: calculateAirQualityIndex,
      };
    } else if (mappingProperty === "LIGHT") {
      return {
        value: { ...unmappedValue }[mappingProperty],
        mappingProperty,
        table: getLumenTable(),
        function: calculateLumenIndex,
      };
    }
  }, [unmappedValue]);

  useEffect(() => {
    if (!_valueInfo) return;
    const valueInfo = { ..._valueInfo };
    var itemDescription = "";
    var calculatedIndexValue = valueInfo.function(
      { [valueInfo.mappingProperty]: valueInfo.value },
      (d) => {
        itemDescription = d;
      }
    );
    const sections = valueInfo.table.rows;
    const max = sections[sections.length - 1].index;
    const min = 0;
    // limit value in range
    if (calculatedIndexValue > max) {
      calculatedIndexValue = max;
    } else if (calculatedIndexValue < min) {
      calculatedIndexValue = min;
    }
    const percentage = Math.floor((calculatedIndexValue / max) * 100);
    setSelectedSectionDescription(itemDescription);
    setIndicatorStyle({ left: `${percentage}%` });
  }, [_valueInfo]);

  useEffect(() => {
    if (!_valueInfo) return;
    const valueInfo = { ..._valueInfo };
    const sections = valueInfo.table.rows;
    var max = sections[sections.length - 1].index;
    sections.forEach((e) => {
      e._percentage = Math.floor((e.index / max) * 100);
    });

    var colors = sections.reduce((p, c) => {
      if (!c.color) return p;
      var currentColor = ` ${c.color} ${c._percentage}%,`;
      return p + currentColor;
    }, "linear-gradient(90deg,");
    colors = colors.slice(0, -1);
    colors += ")";

    setIndicatorBarStyle({ background: colors });
  }, [_valueInfo]);

  if (!unmappedValue) return null;

  return (
    <HoverCard zIndex={501} shadow="md">
      <HoverCard.Target>
        <div className="sbd-live-analytics-value-indicator">
          <div
            className="sbd-live-analytics-value-indicator__bar"
            style={indicatorBarStyle}
          />
          <div
            className="sbd-live-analytics-value-indicator__indicator"
            style={indicatorStyle}
          />
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm" weight="bold">
          {_valueInfo.table.label}
        </Text>
        {selectedSectionDescription && (
          <Text size="sm">{selectedSectionDescription}</Text>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default LiveAnalyticsValueIndicator;
