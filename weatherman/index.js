import { createRequire } from "module";
import { WeatherMan } from "./weatherman.js";
const require = createRequire(import.meta.url);
import * as path from "path";
const yargs = require("yargs");

const argv = yargs
  .option({
    e: {
      alias: "calculateYearStats",
      describe: "Calculate month Stats",
      string: true,
    },
  })
  .option({
    a: {
      alias: "calculateMonthStats",
      describe: "Calculate month Stats",
      string: true,
    },
  })
  .option({
    p: {
      alias: "path",
      describe: "folder path to locate files",
      string: true,
    },
  })
  .help()
  .alias("help", "h").argv;

let directoryPath;

if (argv.path) directoryPath = argv.path;
else directoryPath = buildPath("weatherfiles");

if (argv.calculateYearStats) {
  const weatherman = new WeatherMan(directoryPath, argv.calculateYearStats);
  weatherman.calcualteYearStats();
}

if (argv.calculateMonthStats) {
  const weatherman = new WeatherMan(directoryPath, argv.calculateMonthStats);
  weatherman.calcualteMonthStats();
}

console.log("PRESS --help FOR ANY HELP");

/**
 * Join Current path with directory name
 * @param { string } directoryName - Directory from read files
 * @return { directoryPath }
 */
function buildPath(directoryName) {
  const __dirname = path.resolve(path.dirname(""));
  return path.join(__dirname, directoryName + "/");
}
