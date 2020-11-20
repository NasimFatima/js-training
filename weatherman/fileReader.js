import fs from "fs";
import d3 from "d3";
import { WEATHER_FILE_HEADERS } from "./constants.js";

/**
 * Read Files in given directory and
 * Return mapping in form of array
 */
export class FilReader {
  /**
   * Constructor
   * @param { string } directory - path of files
   * @param { format } format - format to match file names
   */
  constructor(directory, format) {
    this.directory = directory;
    this.format = format;
  }

  /**
   * filter directory by given format
   * @return { matchingFileNames }
   */
  readFileNamesByFormat = () => {
    let matchingFileNames = [];
    try {
      matchingFileNames = fs
        .readdirSync(this.directory)
        .filter((file) => file.includes(this.format));
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("File not found!");
      } else {
        console.log(err);
      }
    }
    return matchingFileNames;
  };

  /**
   * Read Content of filtered files
   * @param { Array } columns - Names of columns to map
   * @return { weatherDataMap }
   */
  readFileContent = (columns) => {
    const weatherDataMap = [];
    const matchingFileNames = this.readFileNamesByFormat();
    matchingFileNames.forEach((file) => {
      let itemIndex;
      const data = fs.readFileSync(this.directory + file, "utf-8");
      const fileData = d3.csvParseRows(data);
      const headers = fileData[0];
      for (let line = 1; line < fileData.length; line++) {
        const weatherObj = {};
        columns.forEach((column) => {
          itemIndex = headers.indexOf(WEATHER_FILE_HEADERS[column]);
          if (column === 'Date') weatherObj[column] = fileData[line][itemIndex];
          else weatherObj[column] = Number(fileData[line][itemIndex]);
        });
        weatherDataMap.push(weatherObj);
      }
    });
    return weatherDataMap;
  };
}
