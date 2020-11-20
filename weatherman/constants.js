import {
  getMaxObj,
  getMinObj
} from "./utils/mathUtils.js";

const HEADERS = {
  "Date": "Date",
  "MaxTemperatureC": "MaxTemperatureC",
  "MinTemperatureC": "MinTemperatureC",
  "MaxHumidity": "MaxHumidity",
  "MeanHumidity": "MeanHumidity",
}

export const WEATHER_FILE_HEADERS = {
  [HEADERS.Date]: "PKT",
  [HEADERS.MaxTemperatureC]: "Max TemperatureC",
  [HEADERS.MinTemperatureC]: "Min TemperatureC",
  [HEADERS.MaxHumidity]: "Max Humidity",
  [HEADERS.MeanHumidity]: " Mean Humidity",
};

export const YEAR_WEATHER_STATS_COLUMNS = [
  HEADERS.Date,
  HEADERS.MaxTemperatureC,
  HEADERS.MinTemperatureC,
  HEADERS.MaxHumidity,
];

export const MONTH_WEATHER_STATS_COLUMNS = [
  HEADERS.MaxTemperatureC,
  HEADERS.MinTemperatureC,
  HEADERS.MeanHumidity,
];

export const YEAR_WEATHER_STATS_OUTPUT_MAPPING = [
  HEADERS.MaxTemperatureC,
  HEADERS.MinTemperatureC,
  HEADERS.MaxHumidity,
];

export const MIN_MAX_FUNCTIONS_MAPPING = {
  [HEADERS.MaxTemperatureC]: (a, b) => getMaxObj(a, b),
  [HEADERS.MinTemperatureC]: (a, b) => getMinObj(a, b),
  [HEADERS.MaxHumidity]: (a, b) => getMaxObj(a, b),
}
