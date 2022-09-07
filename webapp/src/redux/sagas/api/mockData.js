const MOCK_DATA = {
  DBMiscData: ["318", "118M", "393"],
  senseboxInfoData: {
    _id: "5bf8373386f11b001aae627e",
    createdAt: "2022-03-30T11:25:43.610Z",
    updatedAt: "2022-09-03T23:29:44.818Z",
    name: "Tworkool",
    currentLocation: {
      type: "Point",
      coordinates: [13.628301, 52.45608],
      timestamp: "2022-08-07T19:37:57.432Z",
    },
    exposure: "indoor",
    sensors: [
      {
        title: "Temperatur",
        unit: "°C",
        sensorType: "HDC1080",
        icon: "osem-thermometer",
        _id: "5bf8373386f11b001aae6285",
        lastMeasurement: {
          value: "21.88",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "rel. Luftfeuchte",
        unit: "%",
        sensorType: "HDC1080",
        icon: "osem-humidity",
        _id: "5bf8373386f11b001aae6284",
        lastMeasurement: {
          value: "59.02",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "Luftdruck",
        unit: "hPa",
        sensorType: "BMP280",
        icon: "osem-barometer",
        _id: "5bf8373386f11b001aae6283",
        lastMeasurement: {
          value: "1014.29",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "Beleuchtungsstärke",
        unit: "lx",
        sensorType: "TSL45315",
        icon: "osem-brightness",
        _id: "5bf8373386f11b001aae6282",
        lastMeasurement: {
          value: "8.00",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "UV-Intensität",
        unit: "μW/cm²",
        sensorType: "VEML6070",
        icon: "osem-brightness",
        _id: "5bf8373386f11b001aae6281",
        lastMeasurement: {
          value: "0.00",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "PM10",
        unit: "µg/m³",
        sensorType: "SDS 011",
        icon: "osem-cloud",
        _id: "5bf8373386f11b001aae6280",
        lastMeasurement: {
          value: "11.40",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "PM2.5",
        unit: "µg/m³",
        sensorType: "SDS 011",
        icon: "osem-cloud",
        _id: "5bf8373386f11b001aae627f",
        lastMeasurement: {
          value: "10.80",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
    ],
    model: "homeV2WifiFeinstaub",
    lastMeasurementAt: "2022-09-03T23:29:44.813Z",
    description:
      "Software for displaying Sensebox data linked below. (It's an amateur project, also it is unofficial)",
    image: "5bf8373386f11b001aae627e_q3si5q.jpg",
    weblink: "https://github.com/tworkool/SenseBox-Visualizer",
    grouptag: [],
    loc: [
      {
        geometry: {
          type: "Point",
          coordinates: [13.628301, 52.45608],
          timestamp: "2022-08-07T19:37:57.432Z",
        },
        type: "Feature",
      },
    ],
  },
  senseboxInfoDataInactiveActiveSensors: {
    _id: "5c0e923e919bf8001abda1dc",
    createdAt: "2022-03-30T11:25:43.620Z",
    updatedAt: "2022-09-07T21:35:40.849Z",
    name: "HTW Berlin Informatik AG  - senseBox 01 - WLAN",
    currentLocation: {
      timestamp: "2018-12-10T16:20:14.769Z",
      coordinates: [13.52612, 52.455362],
      type: "Point",
    },
    exposure: "indoor",
    sensors: [
      {
        title: "Temperatur",
        unit: "°C",
        sensorType: "HDC1080",
        icon: "osem-thermometer",
        _id: "5c0e923e919bf8001abda1e3",
        lastMeasurement: {
          value: "27.39",
          createdAt: "2022-09-07T21:35:40.844Z",
        },
      },
      {
        title: "rel. Luftfeuchte",
        unit: "%",
        sensorType: "HDC1080",
        icon: "osem-humidity",
        _id: "5c0e923e919bf8001abda1e2",
        lastMeasurement: {
          value: "40.55",
          createdAt: "2022-09-07T21:35:40.844Z",
        },
      },
      {
        title: "Luftdruck",
        unit: "hPa",
        sensorType: "BMP280",
        icon: "osem-barometer",
        _id: "5c0e923e919bf8001abda1e1",
        lastMeasurement: {
          value: "1008.28",
          createdAt: "2022-09-07T21:35:40.844Z",
        },
      },
      {
        title: "Beleuchtungsstärke",
        unit: "lx",
        sensorType: "TSL45315",
        icon: "osem-brightness",
        _id: "5c0e923e919bf8001abda1e0",
        lastMeasurement: {
          value: "0.00",
          createdAt: "2022-09-07T21:35:40.844Z",
        },
      },
      {
        title: "UV-Intensität",
        unit: "μW/cm²",
        sensorType: "VEML6070",
        icon: "osem-brightness",
        _id: "5c0e923e919bf8001abda1df",
        lastMeasurement: {
          value: "0.00",
          createdAt: "2022-09-07T21:35:40.844Z",
        },
      },
      {
        title: "PM10",
        unit: "µg/m³",
        sensorType: "SDS 011",
        icon: "osem-cloud",
        _id: "5c0e923e919bf8001abda1de",
        lastMeasurement: {
          value: "0.20",
          createdAt: "2022-02-05T16:12:16.684Z",
        },
      },
      {
        title: "PM2.5",
        unit: "µg/m³",
        sensorType: "SDS 011",
        icon: "osem-cloud",
        _id: "5c0e923e919bf8001abda1dd",
        lastMeasurement: {
          value: "0.20",
          createdAt: "2022-02-05T16:12:16.684Z",
        },
      },
    ],
    model: "homeV2WifiFeinstaub",
    lastMeasurementAt: "2022-09-07T21:35:40.844Z",
    grouptag: [""],
    loc: [
      {
        geometry: {
          timestamp: "2018-12-10T16:20:14.769Z",
          coordinates: [13.52612, 52.455362],
          type: "Point",
        },
        type: "Feature",
      },
    ],
  },
};

export default MOCK_DATA;
