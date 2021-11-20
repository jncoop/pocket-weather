import { setData, getData } from "./datastoreCoord";

const savedCitiesKey = "savedCities";

export const setCities = (cities) => {
  setData(savedCitiesKey, cities);
};

export const getCities = async () => {
  return getData(savedCitiesKey);
};
