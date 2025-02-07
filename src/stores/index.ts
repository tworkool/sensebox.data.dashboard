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
  automaticUpdateInterval: 60,
  boxInactiveAfter: 24,
  sensorInactiveAfter: 12,
  fallbackNullValue: "N/A",
  primaryDashboardColor: "#9038e8",
  dateFormat: "MMM Do YY",
};

const useSettingsStore = createStore<ISettings>(defaultSettings, CONSTANTS.SETTINGS_LOCALSTORAGE_KEY);

interface IPinnedBox {
  boxId: string | null;
};

const usePinnedBoxStore = createStore<IPinnedBox>({ boxId: null }, CONSTANTS.PINNED_BOX_LOCALSTORAGE_KEY);

export { useSettingsStore, defaultSettings, usePinnedBoxStore };
export type { ISettings, IPinnedBox };
