const normalize = function (rawData, ...columns) {
    let data = rawData;
    if (rawData[0].dataValues) {
        data = extractDataValues(rawData)
    }
    if (columns.length === 0) return data;
    columns = columns[0];

    const valuesToExtract = []
    columns.forEach(column => recursion(valuesToExtract, column))
    data.map(el => extractDataObj(valuesToExtrac, el))
    return data;
};

const extractDataObj = function (valuesToExtract, el) {
    valuesToExtract.forEach(val => {
        const { value, path } = val;
        const finalVal = path.reduce((acc, cur) => {
            if (acc === '') {
                return el[cur]
            }
            return acc[cur]
        }, '')
        el[value] = finalVal
    });
    return el;
};

const normalizeOne = function (rawObj, ...columns) {
    let obj = rawObj;
    if (rawObj.dataValues) {
        obj = rawObj.dataValues;
    }
    if (columns.length === 0) return obj;
    columns = columns[0];

    const valuesToExtract = [];
    columns.forEach(column => recursion(valuesToExtract, column));
    newObj = extractDataObj(valuesToExtract, obj)
    return newObj;
}


const extractDataValues = function (rawData) {
    const data = rawData.map(el => el.dataValues)
    return data
};

const recursion = function (result, object, ...prevRound) {
    for (const [key, value] of Object.entries(object)) {
        prevRound.push(key)
        value.forEach(val => {
            if (typeof val === 'object' && val !== null) {
                return recursion(result, val, ...prevRound)
            }
            result.push({ value: val, path: [...prevRound, val].join('.dataValues.').split('.') })
        })
    }
};

const delExtra = function (rawData, keys) {
    const data = rawData.map(el => deleteKeys(el, keys))
    return data
}

const deleteKeys = function (el, keys) {
    keys.forEach(key => {
        delete el[key]
    })
    return el
};

module.exports = { delExtra, normalize, normalizeOne, deleteKeys };