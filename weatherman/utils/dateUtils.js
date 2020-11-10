import moment from "moment";

/**
 * @param { string } inputDate  - input date
 * @param { string } inputFormat - format of input date
 * @param { string } monthFormat - format of return month "MMMMM" in case of
 * full month name "MMM" in case of short name
 */
export const parseMonthArgsInputToMonth = (
  inputDate,
  inputFormat = "Y-M-D",
  monthFormat = "MMMM"
) => {
  const parsedMonthDate = moment(inputDate, inputFormat, true);
  return parsedMonthDate.isValid()
    ? parsedMonthDate.format(monthFormat)
    : undefined;
};

/**
 *
 * @param { string } inputDate - input date
 * @param { string } format - format of input date
 */
export const parseYearArgsInputToYear = (inputDate, format) => {
  const parsedYearDate = moment(inputDate, format, true);
  return parsedYearDate.isValid() ? String(parsedYearDate.year()) : undefined;
};

/**
 *
 * @param { string } inputDate - input Date
 */
export const parseDateToMonthDay = (inputDate) => {
  const parsedMonthDate = parseMonthArgsInputToMonth(inputDate);
  const parsedDay = moment(inputDate, "Y-M-D", true).day();
  return parsedMonthDate + parsedDay;
};

