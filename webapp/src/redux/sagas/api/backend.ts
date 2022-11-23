import { fetch } from "cross-fetch";
import moment from "moment";
import ENVIRONMENT from "../../../utils/env";
import { isFloat } from "../../../utils/helpers";
import MOCK_DATA from "./mockData";

class MockResponse {
    status: Number;
    statusText: string;
    body: Object;

    constructor(options) {
        this.status = options.status.code;
        this.statusText = options.status.text;
        this.body = options.body;
    }

    json() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.body);
            }, 10);
        });
    }
}

const _fetchMock = (mockData, status, delay): Promise<MockResponse> => {
    return new Promise((resolve, reject) => {
        const mockResponse = new MockResponse({ status: { code: status.code, text: status.text }, body: mockData });
        setTimeout(() => {
            resolve(mockResponse);
        }, delay);
    });
}

const _fetch = (url, mockData: any = undefined, delay = 2000, status: Object = { text: "MOCK DATA NO ERRORS", code: 200 }, logging = ENVIRONMENT.CONSOLE_LOGS) => {
    if (ENVIRONMENT.MOCK_API_DATA === true && mockData !== undefined) {
        if (logging)
            console.log("Fetching Mock Data", mockData);
        return _fetchMock(mockData, status, delay);
    } else {
        if (logging)
            console.log("Fetching by URL...", url);
        return fetch(url);
    }
}

const BACKEND = {
    sample_fetch: (lat, lon) => {
        if (!isFloat(lat) || !isFloat(lon)) {
            throw new Error("REQUEST ERROR: lat and lon need to be floats");
        }
        const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ENVIRONMENT.WEATHER_API_KEY}`;

        return _fetch(fetchUrl)
    },

    fetchSenseboxesByName: (name: string) => {
        var url = "https://api.opensensemap.org/boxes?minimal=true&bbox=-180,-90,180,90&limit=4";
        if (name !== "") url += `&name=${name}`;
        return _fetch(url);
    },

    fetchSenseboxInfo: (id: string) => {
        var url = `https://api.opensensemap.org/boxes/${id}`;
        return _fetch(url, MOCK_DATA.senseboxInfoData);
    },

    fetchSenseboxes: () => {
        var url = "https://api.opensensemap.org/boxes?minimal=true&bbox=-180,-90,180,90";
        return _fetch(url);
    },

    fetchSenseboxDBMiscData: () => {
        var url = "https://api.opensensemap.org/stats?human=true";
        return _fetch(url, MOCK_DATA.DBMiscData);
    },

    fetchSenseboxSensorData: (senseboxID) => {
        var url = `https://api.opensensemap.org/boxes/${senseboxID}/sensors`;
        return _fetch(url);
    },

    fetchGeocodingData: (lat, lon) => {
        // reverse geocoding API
        var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lon}.json?limit=1&language=en&access_token=${ENVIRONMENT.MAPBOX_PUBLIC_KEY}`;
        return _fetch(url, MOCK_DATA.geocoding1, 5000);
    },

    fetchSunApiData: (lat, lon, date: any = null) => {
        // Sunset/Sunrise API
        const _date = !date ? moment().format("YYYY-MM-DD") : date.format("YYYY-MM-DD");
        var url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0&date=${_date}`;
        return _fetch(url, MOCK_DATA.sunApiData(17));
    },
};

export default BACKEND;