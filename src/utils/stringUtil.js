/**
 * String Utils
 */

/**
 * Combination of name array to separate by ','
 * @param {*} names list of names
 * @returns string of combined names
 */
export const combineNames = (names) => {
  return Array.isArray(names) ? names.join(", ") : "";
};
