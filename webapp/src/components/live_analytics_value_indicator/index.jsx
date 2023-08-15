import { HoverCard, Text } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import "./style.scss";

const getAirQualityTable = () => {
  return {
    name: "AQI",
    link: "",
    label: "EPA Air Quality Index (AQI) for last measured value",
    viewProperties: {
      //gradientStopsMode: "hard",
      evenDistribution: true,
    },
    rows: [
      {
        PM10: 54,
        PM25: 12,
        index: 50,
        label: "",
        shortLabel: "Good Airquality",
        color: "#79bc6a",
      },
      {
        PM10: 154,
        PM25: 35.4,
        index: 100,
        label: "",
        shortLabel: "Moderate Airquality",
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
        shortLabel: "Unhealthy Airquality",
        color: "#F29305",
      },
      {
        PM10: 424,
        PM25: 250.4,
        index: 300,
        label: "",
        shortLabel: "Very Unhealthy Airquality",
        color: "#E8416F",
      },
      {
        PM10: 604,
        PM25: 500.4,
        index: 500,
        label: "",
        shortLabel: "Hazardous Airquality",
        color: "#7E0023",
      },
    ],
  };
};

const getLumenTable = () => {
  return {
    name: "Light (lx)",
    link: "https://securitycamcenter.com/cctv-lux-light-ratings-explained/",
    label: "Light (1 lx = lm / m^2)",
    viewProperties: {
      evenDistribution: true,
    },
    rows: [
      {
        LIGHT: 0.0001,
        index: 0.0001,
        label: "",
        shortLabel: "Moonless Overcast Night",
        color: "#03051c",
      },
      {
        LIGHT: 0.0011,
        index: 0.0011,
        label: "",
        shortLabel: "Starlight",
      },
      {
        LIGHT: 0.0108,
        index: 0.0108,
        label: "",
        shortLabel: "Quarter Moon",
      },
      {
        LIGHT: 0.108,
        index: 0.108,
        label: "",
        shortLabel: "Full Moon",
      },
      {
        LIGHT: 1.08,
        index: 1.08,
        label: "",
        shortLabel: "Deep Twilight",
      },
      {
        LIGHT: 10.75,
        index: 10.75,
        label: "",
        shortLabel: "Darkness with very little light or Twilight",
      },
      {
        LIGHT: 107.53,
        index: 107.53,
        label: "",
        shortLabel: "Very Dark Day",
      },
      {
        LIGHT: 1075.3,
        index: 1075.3,
        label: "",
        shortLabel: "Overcast Day",
      },
      {
        LIGHT: 10752.7,
        index: 10752.7,
        label: "",
        shortLabel: "Daylight",
        color: "rgb(255, 223, 139)",
      },
      {
        LIGHT: 107527,
        index: 107527,
        label: "",
        shortLabel: "Sunlight",
        color: "rgb(255 234 129)",
      },
      {
        LIGHT: 220000,
        index: 220000,
        label: "",
        shortLabel: "Very Bright Direct Sunlight",
        color: "rgb(255 254 232)",
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
  handleRowSelection(`Index ${AQI_INDEX}, ${high.shortLabel}`);
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
    
    // calculate section percentages
    var indicatorSection = undefined;
    for (let i = 0; i < sections.length; i++) {
      const element = sections[i];

      const _previousIndex = i === 0 ? min : sections[i - 1].index;
      var _absolutePercentage, _relativePercentage;
      if (valueInfo.table?.viewProperties?.evenDistribution === true) {
        const oneSectionPercentageLength = (100 / sections.length);
        _absolutePercentage = oneSectionPercentageLength * i;
        _relativePercentage = oneSectionPercentageLength;
      } else {
        _absolutePercentage = (element.index / max) * 100;
        _relativePercentage = ((element.index - _previousIndex) / max) * 100; // same as e.index/max - _previousIndex/max
      }
      
      if (calculatedIndexValue < element.index ) {
        indicatorSection = {
          ...element,
          _previousIndex,
          _absolutePercentage,
          _relativePercentage
        };
        break;
      }
    }

    if (indicatorSection === undefined) return;

    // calculate relative percentage on section based on calculated index and add it to absolute whole graph percentage
    const d_min_calculated = calculatedIndexValue - indicatorSection._previousIndex;
    const d_max_min = indicatorSection.index - indicatorSection._previousIndex;
    const relative_section_percentage = d_min_calculated / d_max_min;
    const absolute_total_percentage = indicatorSection._absolutePercentage + indicatorSection._relativePercentage * relative_section_percentage;

    setSelectedSectionDescription(itemDescription);
    setIndicatorStyle({ left: `${absolute_total_percentage}%` });
  }, [_valueInfo]);

  useEffect(() => {
    if (!_valueInfo) return;
    const valueInfo = { ..._valueInfo };
    const sections = valueInfo.table.rows;
    var max = sections[sections.length - 1].index;
    sections.forEach((e, i) => {
      if (valueInfo.table?.viewProperties?.evenDistribution === true) {
        e._percentage = (100 / sections.length) * i;
      } else {
        e._percentage = (e.index / max) * 100;
      }
    });

    var previousValidColor = undefined;
    var colors = sections.reduce((p, c) => {
      if (!c.color) return p;
      var currentColor = "";
      // hard stops?
      const gradientStopsMode =
        valueInfo.table?.viewProperties?.gradientStopsMode;
      if (previousValidColor !== undefined && gradientStopsMode === "hard") {
        currentColor += ` ${previousValidColor} ${c._percentage}%,`;
      }
      currentColor += ` ${c.color} ${c._percentage}%,`;
      previousValidColor = c.color;
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
