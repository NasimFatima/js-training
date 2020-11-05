import { getMinMaxObj, getAvgObj } from "./utils/mathUtils.js"
import { getYear, formattedDateForOutput, getShortMonthFromString } from "./utils/dateUtils.js"
import { FilReader } from "./fileReader.js"

/**
 * WeatherMan class .
 */
export class WeatherMan {

    /**
     * Function Constructor.
     * @param {String} directoryPath Path where files are stored.
     * @param {String} date Date in form of year or Y/m.
     * @param {boolean} month
     * @param {string} calculateTask
     */
    constructor(directoryPath, date, month=False, calculateTask) {
        this.directoryPath = directoryPath
        this.date = date
        this.withMonth = month
        this.calculateTask = calculateTask
    } 

     /**
     * Parse date string 
     * @param {boolean} withMonth Path where files are stored.
     * @return {formatToMatchFiles}
     */
    parseDate() {
        this.formatToMatchFiles = getYear(this.date)
        if (this.withMonth) {
            const month = getShortMonthFromString(this.date)
            if (month)
                this.formatToMatchFiles += `_${month}`
        }
        return this.formatToMatchFiles
    }

    /**
     * Read Files and calculate weather Stats
     */
    getWeatherStats() {
        this.weatherStats = {
            'Max' : {'MaxTemperatureC' : {}, 'MinTemperatureC' : {}, 'MaxHumidity' : {}},
            'Avg' : {'MaxTemperatureC' : {}, 'MinTemperatureC' : {}, 'MeanHumidity' : {}}
        }
        this.parseDate()
        if (!this.formatToMatchFiles) {
            console.log("INVALID DATE FORMAT", this.date)
        }
        const reader = new FilReader(this.directoryPath, this.formatToMatchFiles)
        this.weatherData = reader.readFileContent()

        if (this.weatherData.length > 0 ) {
            if (this.calculateTask === '-e') this.getHighLowTempAndHumidity()
            else this.getAvgTempAndHumidity()
        }
        else {
            console.log("NO DATA FOUND FOR YEAR ", this.date)
        }
    }

     /**
     * Claculate Highest Temperature, Lowest Temperature and
     * Highest Humidity 
     */
    getHighLowTempAndHumidity() {
        for (const property of Object.keys(this.weatherStats.Max)) {
            if (property != 'MinTemperatureC') {
                this.weatherStats.Max[property] = getMinMaxObj(this.weatherData, property)
            }
            else {
                this.weatherStats.Max[property] = getMinMaxObj(this.weatherData, property, false)
            }
        }
        this.printHighLowTempAndHumidity()
    }

    /**
     * Claculate Average MaxTemperature, Average Lowest Temperature and
     * Average Mean Humidity 
     */
    getAvgTempAndHumidity() {
        for (const property of Object.keys(this.weatherStats.Avg)) {
            this.weatherStats.Avg[property] = getAvgObj(this.weatherData, property)
        }
        this.printAvgTempAndHumidity()  
    }

    /**
     * Print Highest Temperature, Lowest Temperature and
     * Highest Humidity in given format
     */
    printHighLowTempAndHumidity() {
        const stats = this.weatherStats.Max
        console.log("****************************************")
        console.log(`HIGHEST: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MaxTemperatureC.Date)}`)
        console.log(`LOWEST: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MinTemperatureC.Date)}`)
        console.log(`HIGHEST HUMIDITY: ${stats.MaxHumidity.MaxHumidity}% on  ${formattedDateForOutput(stats.MaxHumidity.Date)}`)
        console.log("****************************************")
    }

    /**
     * Print Average MaxTemperature, Average Lowest Temperature and
     * Average Mean Humidity in given format 
     */
    printAvgTempAndHumidity() {
        const stats = this.weatherStats.Avg
        console.log("****************************************")
        console.log(`HIGHEST AVERGAE: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MaxTemperatureC.Date)}`)
        console.log(`LOWEST AVERGAE: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MinTemperatureC.Date)}`)
        console.log(`AVERGAE MEAN HUMIDITY: ${stats.MeanHumidity.MeanHumidity}% on  ${formattedDateForOutput(stats.MeanHumidity.Date)}`)
        console.log("****************************************")
    }
}

