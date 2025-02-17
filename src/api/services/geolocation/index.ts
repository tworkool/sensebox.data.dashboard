import { RelativePathBuilder, LocationIQApiClient } from "@api/api";
import { ReactQueryKey } from "@api/shared.types";

enum LocationIQ_ZoomLevel {
    Country = 3,
    State = 5,
    County = 8,
    City = 10,
    Suburb = 14,
    Street = 16,
    Building = 18
}

interface LocationIQ_Request_ReverseGeolocation {
    lat: number;
    lon: number;
    format?: "xmlv1.1" | "json" | "xml";
    zoom?: LocationIQ_ZoomLevel;
    "accept-language"?: string;
    normalizeaddress?: 0 | 1;
}

interface LocationIQ_NormalizedAddress {
    house_number: string;
    road: string;
    neighbourhood: string;
    suburb: string;
    city: string;
    postcode: string;
    country: string;
    country_code: string;
}

interface LocationIQ_Response_ReverseGeolocation {
    place_id: string;
    lat: string;
    lon: string;
    display_name: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    boundingbox: [string, string, string, string];
    address: LocationIQ_NormalizedAddress;
}

const getReverseGeolocation = async (
  { queryKey }: ReactQueryKey<LocationIQ_Request_ReverseGeolocation>,
) => {
  const params: LocationIQ_Request_ReverseGeolocation = queryKey[1];
  if (!params.lat || !params.lon) return null;
  const path = new RelativePathBuilder("/reverse").appendQueryParams(params).build();
  const response = await LocationIQApiClient.get<LocationIQ_Response_ReverseGeolocation>(path);

  // prepare data
  const reData = response.data as LocationIQ_Response_ReverseGeolocation;

  return reData;
};

export const GeolocationService = {
  getReverseGeolocation,
};
