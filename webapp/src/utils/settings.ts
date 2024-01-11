import CONSTANTS from "./constants";


enum DashboardSettingType {
  Number,
  FloatingPointNumber,
  Text,
  Date,
  Json,
  Boolean,
}

interface DashboardSetting {
  value: unknown,
  key: string,
  type: DashboardSettingType,
  description?: string | null,
  label: string,
}

interface DashboardSettingList {
  settings: DashboardSetting[],
}

const getDefaultSettings = () => {
  const SETTINGS: DashboardSettingList = {
    settings: [
      {
        value: CONSTANTS.SENSEBOX_INACTIVITY_TIME_DAYS,
        key: "SENSEBOX_INACTIVITY_TIME_DAYS",
        type: DashboardSettingType.Number,
        label: "Box Inactive After (Days)",
        description: "Number of days after box is counted as inactive",
      },
      {
        value: CONSTANTS.SENSEBOX_SENSOR_INACTIVITY_TIME_HOURS,
        key: "SENSEBOX_SENSOR_INACTIVITY_TIME_HOURS",
        type: DashboardSettingType.Number,
        label: "Sensor Inactive After (Days)",
        description: "Number of days after box sensor is counted as inactive",
      },
      {
        value: CONSTANTS.DEFAULT_NULL_FALLBACK_VALUE,
        key: "DEFAULT_NULL_FALLBACK_VALUE",
        type: DashboardSettingType.Text,
        label: "Default Null Character",
        description: "Character that is displayed instead when a value cannot be displayed",
      },
      {
        value: CONSTANTS.DATE_FORMAT,
        key: "DATE_FORMAT",
        type: DashboardSettingType.Text,
        label: "Display Date Format",
        description: null,
      },
    ]
  };

  return SETTINGS;
};

const simplifySettings = (settingsList: DashboardSettingList) => {
  const _settings = {};
  settingsList.settings.forEach(e => {
    _settings[e.key] = e.value;
  });
};

export { getDefaultSettings, simplifySettings };