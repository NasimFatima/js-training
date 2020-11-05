/* eslint-disable require-jsdoc */

export const getMinMaxObj = (objArray, property, Max=true ) => {
    const data = removeEmptyValue(objArray, property)
    if (data.length > 0) {
        if (!Max) 
            return data.reduce((min, elem) => Number(min[property]) > Number(elem[property]) ? min : elem)
        return data.reduce((max, elem) => Number(max[property]) > Number(elem[property]) ? max : elem)
    }
    return data   
}

export const getAvgObj = (objArray, property) => {
    const data = removeEmptyValue(objArray, property)
    const average = (data.reduce((sum, elem) => sum + elem[property], 0) / data.length) * 100
    const closest = data.reduce((a, b) => 
        Math.abs(average - a[property]) <= Math.abs(average - b[property])
            ? a
            : b
    );
    return closest
}

function removeEmptyValue(data, property) {
    return data.filter((item) => item[property] != '')
}

