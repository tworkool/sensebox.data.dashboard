import { createStore } from "./store_factory";
import { CONSTANTS } from "@utils/environment";

interface ISettings {
  automaticUpdateInterval: number;
  boxInactiveAfter: number;
  sensorInactiveAfter: number;
  fallbackNullValue: string;
  primaryDashboardColor: string;
  dateFormat: string;
};

// Default settings for the dashboard
// all settings MUST be present in this object and have a default value
const defaultSettings: ISettings = {
  automaticUpdateInterval: 60, // seconds
  boxInactiveAfter: 24, // hours
  sensorInactiveAfter: 12, // hours
  fallbackNullValue: "N/A",
  primaryDashboardColor: "#9038e8",
  dateFormat: "MMM Do YY",
};

const useSettingsStore = createStore<ISettings>(defaultSettings, CONSTANTS.SETTINGS_LOCALSTORAGE_KEY);

interface IOverviewBoxInfo {
  pinnedBoxId: string | null;
  lastActiveBoxId: string | null;
};

const useOverviewBoxInfoStore = createStore<IOverviewBoxInfo>(
  { pinnedBoxId: null, lastActiveBoxId: null }, 
  CONSTANTS.OVERVIEW_BOX_INFO_LOCALSTORAGE_KEY
);

export { useSettingsStore, defaultSettings, useOverviewBoxInfoStore };
export type { ISettings, IOverviewBoxInfo };
