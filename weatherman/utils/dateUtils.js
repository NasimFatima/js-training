/* eslint-disable require-jsdoc */


export const getShortMonthFromString = (dateString) => {
    try {
        const parts = dateString.split('/');
        return getMonth(new Date(parts[0], parts[1]-1), 'short');
    }
    catch(err) {
        console.error(`EXCEPTION IN DATE PARSING ${err}`)
    }

}

export const getYear = dateString => {
    return parseDate(dateString).getFullYear()
}

export const formattedDateForOutput = dateString => {
    
    const date = parseDate(dateString)
    return `${getMonth(date)} ${date.getDay()}`
}


function parseDate (dateString) {
    return (new Date(dateString))
}


function  getMonth(dateobj, monthFormat='long') {
    return dateobj.toLocaleString('default', {month: monthFormat})
    
}

export const validateYearAndMonth = dateString => {
    return /^(19|20)\d{2}\/(0?[1-9]|1\d|2\d|3[01])$/.test(dateString)
}

export const validateYear = dateString => {
    return /^(19|20)\d{2}$/.test(dateString)
}

