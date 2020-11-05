import { createRequire } from "module";
import { validateYearAndMonth, validateYear } from "./utils/dateUtils.js";
import { WeatherMan } from "./weatherman.js";
const require = createRequire(import.meta.url);
const path = require("path");
const yargs = require("yargs");

const argv = yargs
  .option("task", {
    alias: "t",
    description: "Task to run: -e,-a",
    type: "string",
  })
  .option("date", {
    alias: "d",
    description: "date to run for",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

if (argv.task === "-e" || argv.task === "-a") {
  if (argv.date) {
    const yearMonthFormat = validateYearAndMonth(argv.date);
    console.log("year format:::", yearMonthFormat);
    const yearFormat = validateYear(argv.date);
    const directoryPath = buildPath("weatherfiles");
    if (yearMonthFormat || yearFormat) {
      const weatherman = new WeatherMan(
        directoryPath,
        argv.date,
        yearMonthFormat,
        argv.task
      );
      weatherman.getWeatherStats();
    } else {
      console.log("INVALID INPUT");
    }
  }
}
else {
    console.log("ENTER VALID INPUT OR PRESS --help")
}

/**
 * Join Current path with directory name
 * @param {string} directoryName
 * @return {directoryPath}
 */
function buildPath(directoryName) {
  const __dirname = path.resolve(path.dirname(""));
  return path.join(__dirname, directoryName + "/");
}

