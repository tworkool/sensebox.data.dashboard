import { fetch } from "cross-fetch";
import ENVIRONMENT from "../../../utils/env";
import { isFloat } from "../../../utils/helpers";

const BACKEND = {
    sample_fetch: (lat, lon) => {
        if (!isFloat(lat) || !isFloat(lon)) {
            throw new Error("REQUEST ERROR: lat and lon need to be floats");
        }
        const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ENVIRONMENT.WEATHER_API_KEY}`;

        return fetch(fetchUrl)
    },

    fetchSenseboxesByName: (name: string) => {
        var url = "https://api.opensensemap.org/boxes?minimal=true&bbox=-180,-90,180,90&limit=4";
        if (name !== "") url += `&name=${name}`;
        console.log(url);
        return fetch(url);
    },

    fetchSenseboxInfo: (id: string) => {
        var url = `https://api.opensensemap.org/boxes/${id}`;
        console.log(url);
        return fetch(url);
    },

    fetchSenseboxes: () => {
        var url = "https://api.opensensemap.org/boxes?minimal=true&bbox=-180,-90,180,90";
        return fetch(url);
    },

    fetchSenseboxDBMiscData: () => {
        var url = "https://api.opensensemap.org/stats?human=true";
        return fetch(url);
        /* return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    "318",
                    "118M",
                    "393"
                ]);
            }, 300);
        }); */
    },

};

export default BACKEND;
