const ISO_NOW_STRING = new Date().toISOString();

const MOCK_DATA = {
  DBMiscData: ["318", "118M", "393"],
  sunApiData: (day) => {
    return {
      results: {
        sunrise: `2022-10-${day}T06:25:39+00:00`,
        sunset: `2022-10-${day}T17:40:24+00:00`,
        solar_noon: `2022-10-${day}T12:03:01+00:00`,
        day_length: 40485,
        civil_twilight_begin: `2022-10-${day}T06:00:53+00:00`,
        civil_twilight_end: `2022-10-${day}T18:05:09+00:00`,
        nautical_twilight_begin: `2022-10-${day}T05:30:50+00:00`,
        nautical_twilight_end: `2022-10-${day}T18:35:13+00:00`,
        astronomical_twilight_begin: `2022-10-${day}T05:00:53+00:00`,
        astronomical_twilight_end: `2022-10-${day}T19:05:10+00:00`,
      },
      status: "OK",
    };
  },
  senseboxInfoData: {
    _id: "5bf8373386f11b001aae627e",
    createdAt: "2022-03-30T11:25:43.610Z",
    updatedAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
        },
      },
      {
        title: "Beleuchtungsstärke",
        unit: "lx",
        sensorType: "TSL45315",
        icon: "osem-brightness",
        _id: "5bf8373386f11b001aae6282",
        lastMeasurement: {
          value: "40000.00",
          createdAt: ISO_NOW_STRING,
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
          createdAt: ISO_NOW_STRING,
        },
      },
    ],
    model: "homeV2WifiFeinstaub",
    lastMeasurementAt: ISO_NOW_STRING,
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
    updatedAt: "2022-03-30T11:25:43.620Z",
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
          createdAt: "2022-03-30T11:25:43.620Z",
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
  geocoding1: {
    type: "FeatureCollection",
    query: [13.628301, 52.45608],
    features: [
      {
        id: "address.4797871057931040",
        type: "Feature",
        place_type: ["address"],
        relevance: 1,
        properties: {
          accuracy: "rooftop",
        },
        text_en: "Scharnweberstraße",
        place_name_en: "Scharnweberstraße 61, 12587 Berlin, Germany",
        text: "Scharnweberstraße",
        place_name: "Scharnweberstraße 61, 12587 Berlin, Germany",
        center: [13.62847795, 52.4558126],
        geometry: {
          type: "Point",
          coordinates: [13.62847795, 52.4558126],
        },
        address: "61",
        context: [
          {
            id: "postcode.6024762",
            text_en: "12587",
            text: "12587",
          },
          {
            id: "locality.90745402",
            text_en: "Friedrichshagen",
            text: "Friedrichshagen",
          },
          {
            id: "place.14094307404564380",
            short_code: "DE-BE",
            wikidata: "Q64",
            text_en: "Berlin",
            language_en: "en",
            text: "Berlin",
            language: "en",
          },
          {
            id: "country.10814856728480410",
            wikidata: "Q183",
            short_code: "de",
            text_en: "Germany",
            language_en: "en",
            text: "Germany",
            language: "en",
          },
        ],
      },
      {
        id: "postcode.6024762",
        type: "Feature",
        place_type: ["postcode"],
        relevance: 1,
        properties: {},
        text_en: "12587",
        place_name_en: "12587, Berlin, Germany",
        text: "12587",
        place_name: "12587, Berlin, Germany",
        bbox: [13.593868, 52.437442, 13.669467, 52.47923],
        center: [13.622879, 52.452043],
        geometry: {
          type: "Point",
          coordinates: [13.622879, 52.452043],
        },
        context: [
          {
            id: "locality.90745402",
            text_en: "Friedrichshagen",
            text: "Friedrichshagen",
          },
          {
            id: "place.14094307404564380",
            short_code: "DE-BE",
            wikidata: "Q64",
            text_en: "Berlin",
            language_en: "en",
            text: "Berlin",
            language: "en",
          },
          {
            id: "country.10814856728480410",
            wikidata: "Q183",
            short_code: "de",
            text_en: "Germany",
            language_en: "en",
            text: "Germany",
            language: "en",
          },
        ],
      },
      {
        id: "locality.90745402",
        type: "Feature",
        place_type: ["locality"],
        relevance: 1,
        properties: {},
        text_en: "Friedrichshagen",
        place_name_en: "Friedrichshagen, Berlin, Germany",
        text: "Friedrichshagen",
        place_name: "Friedrichshagen, Berlin, Germany",
        bbox: [13.594255, 52.437442, 13.669467, 52.47923],
        center: [13.626272, 52.44938],
        geometry: {
          type: "Point",
          coordinates: [13.626272, 52.44938],
        },
        context: [
          {
            id: "place.14094307404564380",
            short_code: "DE-BE",
            wikidata: "Q64",
            text_en: "Berlin",
            language_en: "en",
            text: "Berlin",
            language: "en",
          },
          {
            id: "country.10814856728480410",
            wikidata: "Q183",
            short_code: "de",
            text_en: "Germany",
            language_en: "en",
            text: "Germany",
            language: "en",
          },
        ],
      },
      {
        id: "place.14094307404564380",
        type: "Feature",
        place_type: ["region", "place"],
        relevance: 1,
        properties: {
          short_code: "DE-BE",
          wikidata: "Q64",
        },
        text_en: "Berlin",
        language_en: "en",
        place_name_en: "Berlin, Germany",
        text: "Berlin",
        language: "en",
        place_name: "Berlin, Germany",
        bbox: [
          13.0883590415111, 52.3382600343987, 13.761131997363, 52.6755029827484,
        ],
        center: [13.38333, 52.51667],
        geometry: {
          type: "Point",
          coordinates: [13.38333, 52.51667],
        },
        context: [
          {
            id: "country.10814856728480410",
            wikidata: "Q183",
            short_code: "de",
            text_en: "Germany",
            language_en: "en",
            text: "Germany",
            language: "en",
          },
        ],
      },
      {
        id: "country.10814856728480410",
        type: "Feature",
        place_type: ["country"],
        relevance: 1,
        properties: {
          wikidata: "Q183",
          short_code: "de",
        },
        text_en: "Germany",
        language_en: "en",
        place_name_en: "Germany",
        text: "Germany",
        language: "en",
        place_name: "Germany",
        bbox: [5.866315, 47.270238, 15.041832, 55.1286491],
        center: [10.0183432948567, 51.1334813439932],
        geometry: {
          type: "Point",
          coordinates: [10.0183432948567, 51.1334813439932],
        },
      },
    ],
    attribution:
      "NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.",
  },
};

export default MOCK_DATA;
