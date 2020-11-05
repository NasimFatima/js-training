import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const d3 = require("d3");
import { WEATHER_FILE_HEADERS } from "./constants.js";

/**
 * Read Files in given directory and
 * Return mapping in form of array
 */
export class FilReader {
  /**
   * Constructor
   * @param { string} directory
   * @param {format} format
   */
  constructor(directory, format) {
    this.directory = directory;
    this.format = format;
  }

  /**
   * filter directory by given format
   * @return {matchingFileNames}
   */
  readFileNamesByFormat() {
    let matchingFileNames = [];
    try {
      matchingFileNames = fs
        .readdirSync(this.directory)
        .filter((file) => file.includes(this.format) === true);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("File not found!");
      } else {
        console.log(err);
      }
    }
    return matchingFileNames;
  }

  /**
   * Read Content of filtered files
   * @return {weatherDataMap}
   */
  readFileContent() {
    let weatherObj = {};
    const weatherDataMap = [];
    const matchingFileNames = this.readFileNamesByFormat();

    if (matchingFileNames.length < 1) {
      return weatherDataMap;
    }

    matchingFileNames.forEach((file) => {
      const data = fs.readFileSync(this.directory + file, "utf-8");
      const fileData = d3.csvParseRows(data);
      for (let j = 1; j < fileData.length; j++) {
        weatherObj = Object.keys(WEATHER_FILE_HEADERS).reduce(
          (acc, value, i) => ((acc[value] = fileData[j][i]), acc),
          {}
        );
        weatherDataMap.push(weatherObj);
      }
    });
    return weatherDataMap;
  }
}

