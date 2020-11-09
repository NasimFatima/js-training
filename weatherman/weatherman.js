import { getMaxObj, getMinObj, getAvgObj } from "./utils/mathUtils.js"
import { getYear, formattedDateForOutput, getShortMonthFromString } from "./utils/dateUtils.js"
import { FilReader } from "./fileReader.js"
import { YEAR_WEATHER_STATS_COLUMNS, MONTH_WEATHER_STATS_COLUMNS} from "./constants.js";

/**
 * WeatherMan class .
 */
export class WeatherMan {

    /**
     * Function Constructor.
     * @param { String } directoryPath -Path where files are stored.
     * @param { String } date -Date in form of year or Y/m.
     */
    constructor(directoryPath, date) {
        this.directoryPath = directoryPath
        this.date = date
    } 

     /**
     * Parse date string 
     */
    parseDate() {
        this.formatToMatchFiles = getYear(this.date)
        if (this.withMonth) {
            const month = getShortMonthFromString(this.date)
            console.log(month)
            if (month)
                this.formatToMatchFiles += `_${month}`
            else 
                this.formatToMatchFiles = ''
        }
    }

    /**
     * Read Files and calculate weather Stats
     * @param { string } columns -Get data of given columns
     */
    readFile(columns) {
        this.weatherData = []
        this.parseDate()
        if (this.formatToMatchFiles) {
            const reader = new FilReader(this.directoryPath, this.formatToMatchFiles)
            this.weatherData = reader.readFileContent(columns)
        }
        else {
            console.log("INVALID DATE FORMAT", this.date)
        }
    }

    /**
     * Read Yearly weather Stats
     */
    calcualteYearStats() {
        this.readFile(YEAR_WEATHER_STATS_COLUMNS)
        if (this.weatherData.length > 0 ) {
            this.getHighLowTempAndHumidity()
        }
        else {
            console.log("NO DATA FOUND FOR YEAR ", this.date)
        }
    }

    /**
     * Read Monthly weather Stats
     */
    calcualteMonthStats() {
        this.withMonth = true
        this.monthWeatherStats = {}
        this.readFile(MONTH_WEATHER_STATS_COLUMNS, true)
        if (this.weatherData.length > 0 ) {
            this.getAvgTempAndHumidity()
        }
        else {
            console.log("NO AVERGE DATA FOUND FOR ", this.date)
        }
    }

     /**
     * Claculate Highest Temperature, Lowest Temperature and
     * Highest Humidity 
     */
    getHighLowTempAndHumidity() {
        this.yearStats = {}
        YEAR_WEATHER_STATS_COLUMNS.forEach(property => {
            if (property != 'MinTemperatureC') {
                this.yearStats[property] = getMaxObj(this.weatherData, property)
            }
            else {
                this.yearStats[property] = getMinObj(this.weatherData, property)
            }
        });
        this.printHighLowTempAndHumidity()
    }

    /**
     * Claculate Average MaxTemperature, Average Lowest Temperature and
     * Average Mean Humidity 
     */
    getAvgTempAndHumidity() {
        MONTH_WEATHER_STATS_COLUMNS.forEach(property => {
            this.monthWeatherStats[property] = getAvgObj(this.weatherData, property)
        })
        this.printAvgMaxMinTempAndHumidity()  
    }

    /**
     * Print Highest Temperature, Lowest Temperature and
     * Highest Humidity in given format
     */
    printHighLowTempAndHumidity() {
        const stats = this.yearStats
        console.log("****************************************")
        console.log(`HIGHEST: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MaxTemperatureC.Date)}`)
        console.log(`LOWEST: ${stats.MinTemperatureC.MinTemperatureC}C on  ${formattedDateForOutput(stats.MinTemperatureC.Date)}`)
        console.log(`HIGHEST HUMIDITY: ${stats.MaxHumidity.MaxHumidity}% on  ${formattedDateForOutput(stats.MaxHumidity.Date)}`)
        console.log("****************************************")
    }

    /**
     * Print Average MaxTemperature, Average Lowest Temperature and
     * Average Mean Humidity in given format 
     */
    printAvgMaxMinTempAndHumidity() {
        const stats = this.monthWeatherStats
        console.log("****************************************")
        console.log(`HIGHEST AVERGAE: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MaxTemperatureC.Date)}`)
        console.log(`LOWEST AVERGAE: ${stats.MaxTemperatureC.MaxTemperatureC}C on  ${formattedDateForOutput(stats.MinTemperatureC.Date)}`)
        console.log(`AVERGAE MEAN HUMIDITY: ${stats.MeanHumidity.MeanHumidity}% on  ${formattedDateForOutput(stats.MeanHumidity.Date)}`)
        console.log("****************************************")
    }
}

