/**
 *
 * @param { Array } objArray - Array of objects
 * @param { String } property - calculate max obj for this property
 */
export const getMaxObj = (objArray, property) => {
  return objArray.reduce((max, elem) =>
    max[property] > elem[property] ? max : elem
  );
};

/**
 *
 * @param { Array } objArray - Array of objects
 * @param { String } property - calculate min obj for this property
 */
export const getMinObj = (objArray, property) => {
  return objArray.reduce((min, elem) =>
    min[property] < elem[property] ? min : elem
  );
};

/**
 *
 * @param { Array } objArray - Array of objects
 * @param { String } property - calculate Avg for this property
 */
export const getAvgObj = (objArray, property) => {
  return Math.trunc(
    objArray.reduce((sum, elem) => sum + elem[property], 0) /
    objArray.length
  );
};

/**
 *
 * @param { Array } objArray - Array of objects
 * @param { String } property - Remove lines where this property is empty
 */
export const removeEmptyValue = (data, property) => {
  return data.filter((item) => item[property] != "");
};
