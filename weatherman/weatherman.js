import {
  getMaxObj,
  getMinObj,
  getAvgObj,
  removeEmptyValue,
} from "./utils/mathUtils.js";
import {
  parseMonthArgsInputToMonth,
  parseYearArgsInputToYear,
  parseDateToMonthDay,
} from "./utils/dateUtils.js";
import { FilReader } from "./fileReader.js";
import {
  YEAR_WEATHER_STATS_COLUMNS,
  MONTH_WEATHER_STATS_COLUMNS,
  MIN_MAX_FUNCTIONS_MAPPING
} from "./constants.js";

/**
 * WeatherMan class .
 */
export class WeatherMan {
  /**
   * Function Constructor.
   * @param { String } directoryPath - Path where files are stored.
   * @param { String } date - Date in form of year or Y/m.
   */
  constructor(directoryPath, date) {
    this.directoryPath = directoryPath;
    this.date = date;
  }

  /**
   * Parse date string
   */
  parseDate() {
    let format = "YYYY";
    this.formatToMatchFiles = "";
    if (this.hasMonth) {
      format = "Y/M";
      const month = parseMonthArgsInputToMonth(this.date, format, "MMM");
      if (month) this.formatToMatchFiles = `_${month}`;
    }
    this.formatToMatchFiles =
      String(parseYearArgsInputToYear(this.date, format)) +
      this.formatToMatchFiles;
  }

  /**
   * Read Files and calculate weather Stats
   * @param { string } columns - Get data of given columns
   */
  readFile(columns) {
    this.weatherData = [];
    this.parseDate();
    if (this.formatToMatchFiles) {
      const reader = new FilReader(this.directoryPath, this.formatToMatchFiles);
      this.weatherData = reader.readFileContent(columns);
    } else {
      console.log("INVALID DATE FORMAT", this.date);
    }
  }

  /**
   * Read Yearly weather Stats
   */
  calcualteYearStats() {
    this.readFile(YEAR_WEATHER_STATS_COLUMNS);
    if (this.weatherData.length > 0) {
      this.getHighLowTempAndHumidity();
    } else {
      console.log("NO DATA FOUND FOR ", this.date);
    }
  }

  /**
   * Read Monthly weather Stats
   */
  calcualteMonthStats() {
    this.hasMonth = true;
    this.monthWeatherStats = {};
    this.readFile(MONTH_WEATHER_STATS_COLUMNS, true);
    if (this.weatherData.length > 0) {
      this.getAvgMaxMinTempAndHumidity();
    } else {
      console.log("NO AVERGE DATA FOUND FOR ", this.date);
    }
  }

  /**
   * Claculate Highest Temperature, Lowest Temperature and
   * Highest Humidity
   */
  getHighLowTempAndHumidity() {
    this.yearStats = {};
    YEAR_WEATHER_STATS_COLUMNS.forEach((property) => {
      const data = removeEmptyValue(this.weatherData, property);
      this.yearStats[property] = MIN_MAX_FUNCTIONS_MAPPING[property](data, property)
    });
    this.printHighLowTempAndHumidity();
  }

  /**
   * Claculate Average MaxTemperature, Average Lowest Temperature and
   * Average Mean Humidity
   */
  getAvgMaxMinTempAndHumidity() {
    MONTH_WEATHER_STATS_COLUMNS.forEach((property) => {
      const data = removeEmptyValue(this.weatherData, property);
      this.monthWeatherStats[property] = getAvgObj(data, property);
    });
    this.printAvgMaxMinTempAndHumidity();
  }

  /**
   * Print Highest Temperature, Lowest Temperature and
   * Highest Humidity in given format
   */
  printHighLowTempAndHumidity() {
    const stats = this.yearStats;
    console.log("****************************************");
    console.log(
      `HIGHEST: ${stats.MaxTemperatureC.MaxTemperatureC
      }C on  ${parseDateToMonthDay(stats.MaxTemperatureC.Date)}`
    );
    console.log(
      `LOWEST: ${stats.MinTemperatureC.MinTemperatureC
      }C on  ${parseDateToMonthDay(stats.MinTemperatureC.Date)}`
    );
    console.log(
      `HIGHEST HUMIDITY: ${stats.MaxHumidity.MaxHumidity
      }% on  ${parseDateToMonthDay(stats.MaxHumidity.Date)}`
    );
    console.log("****************************************");
  }

  /**
   * Print Average MaxTemperature, Average Lowest Temperature and
   * Average Mean Humidity in given format
   */
  printAvgMaxMinTempAndHumidity() {
    const stats = this.monthWeatherStats;
    console.log("****************************************");
    console.log(`HIGHEST AVERGAE: ${stats.MaxTemperatureC}C `);
    console.log(`LOWEST AVERGAE: ${stats.MaxTemperatureC}C`);
    console.log(`AVERGAE MEAN HUMIDITY: ${stats.MeanHumidity}%`);
    console.log("****************************************");
  }
}
