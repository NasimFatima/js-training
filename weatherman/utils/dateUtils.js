/* eslint-disable require-jsdoc */


export const getShortMonthFromString = (dateString) => {
    try {
        let monthName = ''
        const parts = dateString.split('/');
        if (parts.lenth > 0)
            monthName = getMonth(new Date(parts[0], parts[1]-1), 'short');
        return monthName
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


