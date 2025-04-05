import { RelativePathBuilder, SunriseSunsetApiClient } from "@api/api";
import { Dayjs } from "dayjs";
import { ReactQueryKey } from "@api/shared.types";
import { OSEM_Response_OneSenseBox } from "../boxes/types";

interface SunriseSunset_Request {
  lat: number,
  lng: number,
  date?: string | Dayjs,
  formatted?: 0 | 1, // 0 = full timestamps, 1 = formatted AM/PM timestamps
}

interface SunriseSunset_Response {
  "results": {
    "sunrise": string | Dayjs,
    "sunset": string | Dayjs,
    "solar_noon": string | Dayjs,
    "day_length": number,
    "civil_twilight_begin": string | Dayjs,
    "civil_twilight_end": string | Dayjs,
    "nautical_twilight_begin": string | Dayjs,
    "nautical_twilight_end": string | Dayjs,
    "astronomical_twilight_begin": string | Dayjs,
    "astronomical_twilight_end": string | Dayjs
  },
  "status": string, // OK | ...
  "tzid": string // UTC | ...
}

const getSunriseSunsetDatetimes = async (
  { queryKey }: ReactQueryKey<SunriseSunset_Request>,
) => {
  console.log(queryKey);
  const params: SunriseSunset_Request = queryKey[1];
  if (!params.lat || !params.lng) return null;
  if (!params.date) params.date = "today";
  if (!params.formatted) params.formatted = 0;
  const path = new RelativePathBuilder().appendQueryParams(params).build();
  console.log(path);
  const response = await SunriseSunsetApiClient.get<SunriseSunset_Response>(path);

  // prepare data
  const reData = response.data as SunriseSunset_Response;
  console.log(reData);

  return reData;
};

const getSunriseSunsetDatetimesFromSenseBox = async (
  { queryKey }: ReactQueryKey<OSEM_Response_OneSenseBox>,
) => {
  if (!queryKey[1]?.currentLocation?.coordinates[0] || !queryKey[1]?.currentLocation.coordinates[1]) return null;
  const _queryKey = [
    queryKey[0],
    {
      lat: queryKey[1].currentLocation.coordinates[1],
      lng: queryKey[1].currentLocation.coordinates[0],
    },
  ];
  const data = await getSunriseSunsetDatetimes({ queryKey: _queryKey });
  if (!data) return null;

  const reData = data as SunriseSunset_Response;

  return reData;
};

export const SunriseSunsetService = {
  getSunriseSunsetDatetimes,
  getSunriseSunsetDatetimesFromSenseBox
};
