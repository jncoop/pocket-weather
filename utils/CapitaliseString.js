/**
 * Capitalizes first char in string
 * @param {string} string - string to capitalise
 * @return {string}
 **/

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
