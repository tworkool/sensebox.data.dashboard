import moment from "moment";
import CONSTANTS from "../../../utils/constants";

const QUERY_DATA_MODIFIERS = {
    dictArraytoDict: (data, mappingKey) => data.reduce((p, i) => { return { [i[mappingKey]]: i, ...p } }, {}),

    limitArrayFromStart: (data, limit = 4) => { return data.slice(0, limit) },

    aggregateGeocodingLocationData: (data) => {
        if (!data?.features || data.features.length == 0)
            throw new Error("Could not fetch location by reverse geocoding, because features are incomplete");
        const selectedFeature = data.features[0];
        const placeFilter = selectedFeature.context.filter(e => e.id.includes("place"));
        const countryFilter = selectedFeature.context.filter(e => e.id.includes("country"));
        return {
            locationExact: selectedFeature["place_name_en"],
            locationCoarse: (placeFilter.length == 0 || countryFilter.length == 0) ? undefined : `${placeFilter[0].text}, ${countryFilter[0].text}`,
            attribution: data["attribution"],
            coordinates: data?.query
        }
    },

    aggregateFilterOptionsFromSensors: (data) => data.sensors?.reduce((p, i) => {
        const classifier = i.unit;
        const sensorInstance = { _id: i._id, title: i.title };
        if (Object.keys(p).includes(classifier)) {
            // EDIT filter
            const newItem = { ...p };
            newItem[classifier].totalAmount += 1;
            newItem[classifier].sensors.push(sensorInstance);
            return newItem;
        } else {
            // ADD new filter
            return {
                ...p,
                [classifier]: {
                    classifier,
                    totalAmount: 1,
                    sensors: [sensorInstance],
                },
            };
        }
    }, {}),

    aggregateExtraSensorInfo: (sensors) => {
        // TODO: DO THIS WITH BOX PROPERTY: UPDATED_AT
        var newMinDispatchInterval = CONSTANTS.MAX_LIVE_UPDATE_DISPATCH_INTERVAL;
        var sensorsUpdateFrequently = false;
        const newExtraSensorInfo = sensors.reduce((p, i) => {
            var isDormant = false;
            if (i.lastMeasurement?.value === undefined) isDormant = true;

            if (
                i.lastMeasurement?.createdAt === undefined ||
                moment().diff(moment(i.lastMeasurement.createdAt), "hours") >
                CONSTANTS.SENSEBOX_SENSOR_INACTIVITY_TIME_HOURS
            )
                isDormant = true;

            var lastMeasurementTime: number | null = null;
            var lastMeasurementValue = CONSTANTS.DEFAULT_NULL_FALLBACK_VALUE;
            if (!isDormant) {
                lastMeasurementTime = moment().diff(
                    moment(i.lastMeasurement.createdAt),
                    "seconds"
                );
                lastMeasurementValue = i.lastMeasurement.value;
                if (
                    lastMeasurementTime < CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL
                ) {
                    // check if updates should be done more frequently
                    sensorsUpdateFrequently = true;
                }
                if (
                    lastMeasurementTime > CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL &&
                    lastMeasurementTime < newMinDispatchInterval
                ) {
                    // check if minDispatchTime should be updated
                    newMinDispatchInterval = lastMeasurementTime;
                }
            }
            return [
                ...p,
                {
                    isDormant,
                    lastMeasurementTime,
                    lastMeasurementValue,
                    title: i.title,
                    unit: i.unit,
                    _id: i._id,
                    sensorType: i.sensorType,
                    icon: i.icon,
                },
            ];
        }, []);
        return {
            dispatchInterval: sensorsUpdateFrequently
                ? CONSTANTS.MIN_LIVE_UPDATE_DISPATCH_INTERVAL
                : newMinDispatchInterval,
            sensors: newExtraSensorInfo
        }
    },

    aggregateSunApiData: (data) => {
        const utcOffset = data["utcOffset"];
        return {
            "utcOffset": data["utcOffset"],
            "sunrise": moment(data["sunrise"]).utcOffset(utcOffset),
            "sunset": moment(data["sunset"]).utcOffset(utcOffset),
            "solar_noon": moment(data["solar_noon"]).utcOffset(utcOffset),
            "day_length": data["day_length"],
            "civil_twilight_begin": moment(data["civil_twilight_begin"]).utcOffset(utcOffset),
            "civil_twilight_end": moment(data["civil_twilight_end"]).utcOffset(utcOffset),
            "nautical_twilight_begin": moment(data["nautical_twilight_begin"]).utcOffset(utcOffset),
            "nautical_twilight_end": moment(data["nautical_twilight_end"]).utcOffset(utcOffset),
            "astronomical_twilight_begin": moment(data["astronomical_twilight_begin"]).utcOffset(utcOffset),
            "astronomical_twilight_end": moment(data["astronomical_twilight_end"]).utcOffset(utcOffset),
        }
    }
};

export default QUERY_DATA_MODIFIERS;