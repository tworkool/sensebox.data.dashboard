import { RelativePathBuilder, OSEMApiClient } from "@api/api";
import {
  OSEM_Response_OneSenseBox, OSEM_Request_OneSenseBox,
  OSEM_Response_AllSenseBoxes, OSEM_Request_AllSenseBoxes,
} from "./types";
import { ReactQueryKey } from "@api/shared.types";
import { useSettingsStore } from "@stores";
import dayjs from "dayjs";
import tzlookup from "tz-lookup";

export interface OSEM_Response_OneSenseBox_E extends OSEM_Response_OneSenseBox {
  active: boolean;
  updatedAt: dayjs.Dayjs;
  createdAt: dayjs.Dayjs;
  /* currentLocation.timestamp: dayjs.Dayjs; */
}

const getOneSenseBox = async (
  { queryKey }: ReactQueryKey<OSEM_Request_OneSenseBox>,
) => {
  const [_, params] = queryKey;
  if (!params?.senseBoxId) return null;
  const path = new RelativePathBuilder("/boxes").appendUrlParam(params.senseBoxId).build();
  const response = await OSEMApiClient.get<OSEM_Response_OneSenseBox>(path);

  // prepare data
  // active status
  const reData = response.data as OSEM_Response_OneSenseBox_E;
  try {
    const lastActiveSensorDate = reData.sensors.reduce((acc, sensor) => {
      const sensorDate = dayjs(sensor.lastMeasurement?.createdAt);
      return sensorDate.isAfter(acc) ? sensorDate : acc;
    }, dayjs(0));
    const sensorInactiveAfter = useSettingsStore.getState()?.current?.sensorInactiveAfter ?? 12;
    const isActive = dayjs().diff(lastActiveSensorDate, "hours") < sensorInactiveAfter;
    reData["active"] = isActive;
  } catch (e) {
    console.warn(`Could not determine active status for senseBox: ${e}`, params.senseBoxId);
  }

  // append timezone
  reData["updatedAt"] = dayjs(reData["updatedAt"]);
  reData["createdAt"] = dayjs(reData["createdAt"]);
  reData["currentLocation"]["timestamp"] = dayjs(reData["currentLocation"]["timestamp"]);
  try {
    const ianaTzCode = tzlookup(reData.currentLocation.coordinates[1], reData.currentLocation.coordinates[0]);
    reData["updatedAt"] = reData["updatedAt"].tz(ianaTzCode);
    reData["createdAt"] = reData["createdAt"].tz(ianaTzCode);
    reData["currentLocation"]["timestamp"] = reData["currentLocation"]["timestamp"].tz(ianaTzCode);
  } catch (e) {
    console.warn(`Could not determine timezone for senseBox: ${e}`, params.senseBoxId);
  }

  return reData;
};

const getAllSenseBoxes = async (
  { queryKey }: ReactQueryKey<OSEM_Request_AllSenseBoxes>,
) => {
  const params: OSEM_Request_AllSenseBoxes = queryKey[1];
  if (!params.bbox) params.bbox = [-180, -90, 180, 90];
  const path = new RelativePathBuilder("/boxes").appendQueryParams(params).build();
  const response = await OSEMApiClient.get<OSEM_Response_AllSenseBoxes>(path);

  // prepare data
  const reData = response.data as OSEM_Response_AllSenseBoxes;

  // append timezone
  reData.forEach((box) => {
    box["currentLocation"]["timestamp"] = dayjs(box["currentLocation"]["timestamp"]);
    try {
      const ianaTzCode = tzlookup(box.currentLocation.coordinates[1], box.currentLocation.coordinates[0]);
      box["currentLocation"]["timestamp"] = box["currentLocation"]["timestamp"].tz(ianaTzCode);
    } catch (e) {
      console.warn(`Could not determine timezone for senseBox: ${e}`, box._id);
    }
  });

  return reData;
};

// -180,-90,180,90

export const OSEMBoxesService = {
  getOneSenseBox,
  getAllSenseBoxes,
};
