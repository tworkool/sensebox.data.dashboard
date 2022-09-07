const QUERY_DATA_MODIFIERS = {
    dictArraytoDict: (data, mappingKey) => data.reduce((p, i) => { return { [i[mappingKey]]: i, ...p } }, {}),

    limitArrayFromStart: (data, limit = 4) => { return data.slice(0, limit) }
};

export default QUERY_DATA_MODIFIERS;