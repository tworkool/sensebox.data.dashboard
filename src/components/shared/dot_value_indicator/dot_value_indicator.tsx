import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./dot_value_indicator.scss";
import { HoverCard, Text } from "@mantine/core";
import { OSEM_Sensor } from "@api/services/boxes/types";
import { clamp } from "@utils/helpers";

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
  let rowIndex = -1;
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

  let decimalLowAdjustment = 0;
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
  let AQI_INDEX = ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low;
  AQI_INDEX = Math.round(AQI_INDEX);
  handleRowSelection(`Index ${AQI_INDEX}, ${high.shortLabel}`);
  return AQI_INDEX;
};

const calculateLumenIndex = (unmappedValue, handleRowSelection) => {
  const mappingProperty = Object.keys(unmappedValue)[0];
  let rowIndex = -1;
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

enum SensorType {
  None = -1,
  ParticualMatter25,
  ParticualMatter10,
  Light,
  Temperature,
  Humidity,
  Pressure,
}

interface SensorTypeMapping {
  units: string[];
  labels: string[];
  sensors: string[];
  type: SensorType;
};

// TODO: integrate convert package
const SensorTypeMapping: Record<string, SensorTypeMapping> = {
  ParticualMatter25: {
    units: ["µg/m³"],
    labels: ["pm25", "pm 25", "pm 2.5", "pm2.5", "pm2,5", "pm 2,5"],
    sensors: ["SDS 011", "SDS011"],
    type: SensorType.ParticualMatter25,
  },
  ParticualMatter10: {
    units: ["µg/m³"],
    labels: ["pm10", "pm 10"],
    sensors: ["SDS 011", "SDS011"],
    type: SensorType.ParticualMatter10,
  },
  Light: {
    units: ["lx"],
    labels: ["light", "Beleuchtungsstärke"],
    sensors: ["TSL45315"],
    type: SensorType.Light,
  },
  Temperature: {
    units: ["°C", "C", "°F", "F", "K", "kelvin", "kelvins", "R", "rankine", "°Ra", "°R", "°K", "fahrenheit", "celsius", "celcius"],
    labels: ["temperature", "temp", "temperatur"],
    sensors: ["HDC1080"],
    type: SensorType.Temperature,
  },
  Humidity: {
    units: ["%"],
    labels: ["humidity", "rel. Luftfeuchte", "relative humidity", "luftfeuchte"],
    sensors: ["HDC1080"],
    type: SensorType.Humidity,
  },
  Pressure: {
    units: ["hPa"],
    labels: ["pressure"],
    sensors: ["BMP280", "BMP 280"],
    type: SensorType.Pressure,
  },
};

const sensorTypeMappingTable = {
  [SensorType.ParticualMatter25]: {
    table: getAirQualityTable(),
    func: calculateAirQualityIndex,
  },
  [SensorType.ParticualMatter10]: {
    table: getAirQualityTable(),
    func: calculateAirQualityIndex,
  },
  [SensorType.Light]: {
    table: getLumenTable(),
    func: calculateLumenIndex,
  },
  [SensorType.Temperature]: null,
  [SensorType.Humidity]: null,
  [SensorType.Pressure]: null,
  [SensorType.None]: null,
};

const getSensorType = (sensor: OSEM_Sensor): SensorType => {
  for (const key in SensorTypeMapping) {
    const typeMapping = SensorTypeMapping[key];

    const isLabel = typeMapping.labels.filter(l => l.toUpperCase() === sensor.title.toUpperCase()).length > 0;
    const isSensor = typeMapping.sensors.filter(s => s.toUpperCase() === sensor.sensorType.toUpperCase()).length > 0;
    const isUnit = typeMapping.units.filter(u => u.toUpperCase() === sensor.unit.toUpperCase()).length > 0;
    if (isLabel && isSensor && isUnit) {
      return typeMapping.type;
    }
  }

  return SensorType.None;
};

interface DotValueIndicatorProps {
  sensor: OSEM_Sensor;
  dot?: boolean;
};

const DotValueIndicator = (props: DotValueIndicatorProps) => {
  const { sensor, dot=false } = props;
  const [inlineStyle, setInlineStyle] = useState<Record<"bar" | "indicator" | "container", React.CSSProperties | undefined>>({
    "container": {
      "display": "none",
    },
    "bar": undefined,
    "indicator": undefined
  });
  const ref = useRef(null);

  useEffect(() => {
    /* ref?.current?.style.setProperty("display", "none"); */
    if (!sensor || !sensor?.lastMeasurement?.value) return;
    const sensorType: SensorType = getSensorType(sensor);
    const sensorValue: number = sensor.lastMeasurement.value;
    console.log(sensor, sensorType, sensorValue);
    if (sensorType === SensorType.None) return;
    if (!sensorTypeMappingTable?.[sensorType]) return;

    const table = sensorTypeMappingTable[sensorType].table;
    const func = sensorTypeMappingTable[sensorType].func;

    // access property name TODO: name the dict as is! e.g. value
    let accessProperty = "value";
    if (sensorType === SensorType.ParticualMatter25) {
      accessProperty = "PM25";
    } else if (sensorType === SensorType.ParticualMatter10) {
      accessProperty = "PM10";
    } else if (sensorType === SensorType.Light) {
      accessProperty = "LIGHT";
    }
    // calc index and get description by passing input value for access property
    let itemDescription = "";
    let mappedIndexValue = func(
      { [accessProperty]: sensorValue },
      (d) => {
        itemDescription = d;
      }
    );

    // max-min limiter
    const sections = table.rows;
    const max = sections[sections.length - 1].index;
    const min = 0;
    mappedIndexValue = clamp(mappedIndexValue, min, max);

    // calculate section percentages by using IIFE (immidiately invoked function expression)
    const useEvenGraphDistribution = !!table?.viewProperties?.evenDistribution;
    const indicatorSection = (() => {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const previousIndex = i === 0 ? min : sections[i - 1].index;
        let absolutePercentage, relativePercentage;
    
        if (useEvenGraphDistribution) {
          const sectionPercentage = 100 / sections.length;
          absolutePercentage = sectionPercentage * i;
          relativePercentage = sectionPercentage;
        } else {
          absolutePercentage = (section.index / max) * 100;
          relativePercentage = ((section.index - previousIndex) / max) * 100;
        }
    
        if (mappedIndexValue < section.index) {
          return {
            ...section,
            previousIndex,
            absolutePercentage,
            relativePercentage
          };
        }
      }
      return null;
    })();

    if (!indicatorSection) return;

    // calculate relative percentage on section based on calculated index and add it to absolute whole graph percentage
    const d_min_calculated = mappedIndexValue - indicatorSection.previousIndex;
    const d_max_min = indicatorSection.index - indicatorSection.previousIndex;
    const relative_section_percentage = d_min_calculated / d_max_min;
    const absolute_percentage = indicatorSection.absolutePercentage + indicatorSection.relativePercentage * relative_section_percentage;
    
    /* setSelectedSectionDescription(itemDescription); */
    // setIndicatorStyle({ left: `${absolute_total_percentage}%` });
    console.log(ref.current);
    /* ref?.current?.style.setProperty("--bar-progress", `${absolute_percentage}%`); */

    // calc colors
    sections.forEach((e, i) => {
      if (useEvenGraphDistribution) {
        e.percentage = (100 / sections.length) * i;
      } else {
        e.percentage = (e.index / max) * 100;
      }
    });

    let previousValidColor = undefined;
    let colors = sections.reduce((p, c) => {
      if (!c.color) return p;
      let currentColor = "";
      // gradient mode
      const gradientStopsMode = table?.viewProperties?.gradientStopsMode;
      if (previousValidColor && gradientStopsMode === "hard") {
        currentColor += ` ${previousValidColor} ${c.percentage}%,`;
      }
      currentColor += ` ${c.color} ${c.percentage}%,`;
      previousValidColor = c.color;
      return p + currentColor;
    }, "linear-gradient(90deg,");
    colors = colors.slice(0, -1);
    colors += ")";

    // setIndicatorBarStyle({ background: colors });
    /* ref?.current?.style.setProperty("--bar-color", colors);
    ref?.current?.style.setProperty("display", "block"); */
    setInlineStyle({
      "container": {
        "display": "block",
      },
      "bar": {
        "background": colors,
      },
      "indicator": {
        "left": `${absolute_percentage}%`,
      }
    });
  }, [sensor]);

  console.log(inlineStyle);

  return (
    <div className="sbd-live-analytics-value-indicator" ref={ref} style={inlineStyle?.container}>
      { dot ? 
        <div className="sbd-live-analytics-value-indicator__dot"></div> : 
        <div
          className="sbd-live-analytics-value-indicator__bar"
          style={inlineStyle?.bar}
        >
          <div
            className="sbd-live-analytics-value-indicator__bar__indicator-track"
          >
            <div
              className="sbd-live-analytics-value-indicator__bar__indicator"
              style={inlineStyle?.indicator}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default DotValueIndicator;
