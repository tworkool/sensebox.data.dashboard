export type RFC3339Date = string;

export interface OSEM_Location {
  coordinates: [longitude: number, latitude: number, altitude?: number];
  timestamp: RFC3339Date;
  type: string;
}

export type OSEM_Exposure = "outdoor" | "indoor" | "mobile" | "unknown";

export type OSEM_Format = "json" | "geojson";

export type OSEM_Icon =
  | "osem-radioactive"
  | "osem-particulate-matter"
  | "osem-moisture"
  | "osem-temperature-celsius"
  | "osem-temperature-fahrenheit"
  | "osem-drops"
  | "osem-thermometer"
  | "osem-windspeed"
  | "osem-sprinkles"
  | "osem-brightness"
  | "osem-barometer"
  | "osem-humidity"
  | "osem-not-available"
  | "osem-gauge"
  | "osem-umbrella"
  | "osem-clock"
  | "osem-shock"
  | "osem-fire"
  | "osem-check"
  | "osem-close"
  | "osem-remove"
  | "osem-times"
  | "osem-signal"
  | "osem-cog"
  | "osem-gear"
  | "osem-trash-o"
  | "osem-download"
  | "osem-volume-up"
  | "osem-register"
  | "osem-map-marker"
  | "osem-plus-circle"
  | "osem-check-circle"
  | "osem-info-circle"
  | "osem-twitter-square"
  | "osem-facebook-square"
  | "osem-github"
  | "osem-globe"
  | "osem-filter"
  | "osem-cloud"
  | "osem-dashboard"
  | "osem-tachometer"
  | "osem-spinner"
  | "osem-microphone"
  | "osem-wifi"
  | "osem-battery"
  | "osem-co2";

export type OSEM_Model = 
  | "homeEthernet"
  | "homeWifi"
  | "homeEthernetFeinstaub"
  | "homeWifiFeinstaub"
  | "luftdaten_sds011"
  | "luftdaten_sds011_dht11"
  | "luftdaten_sds011_dht22"
  | "luftdaten_sds011_bmp180"
  | "luftdaten_sds011_bme280"
  | "custom";

export interface ReactQueryKey<T> {
  queryKey: [string, T];
}
