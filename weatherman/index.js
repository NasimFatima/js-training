import { createRequire } from "module";
import { WeatherMan } from "./weatherman.js";
const require = createRequire(import.meta.url);
import * as path from "path"
const yargs = require("yargs")

const argv = yargs
  .option("task1", {
    alias: "t1",
    description: "Task1 to run: -e",
    type: "string",
  })
  .option("date1", {
    alias: "d1",
    description: "date to run for e.g. 2004",
    type: "string",
  })
  .option("task2", {
    alias: "t2",
    description: "Task to run: -a",
    type: "string",
  })
  .option("date2", {
    alias: "d2",
    description: "date to run for e.g. 2004/03",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

const directoryPath = buildPath("weatherfiles");
if (argv.date1) {
  if (argv.task1 === "-e") {
    const weatherman = new WeatherMan(directoryPath, argv.date1);
    weatherman.calcualteYearStats();
  }
}
if (argv.date2) {
  if (argv.task2 === "-a") {
    const weatherman = new WeatherMan(directoryPath, argv.date2);
    weatherman.calcualteMonthStats();
  }
} else {
  console.log("ENTER DATE OR PRESS --help");
}

/**
 * Join Current path with directory name
 * @param { string } directoryName -Directory from read files
 * @return { directoryPath }
 */
function buildPath(directoryName) {
  const __dirname = path.resolve(path.dirname(""));
  return path.join(__dirname, directoryName + "/");
}

