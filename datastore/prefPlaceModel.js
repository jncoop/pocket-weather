import { setData, getData } from "./datastoreCoord";

const prefLocationKey = "prefLocation";

export const setPrefPlace = (cities) => {
  setData(prefLocationKey, cities);
};

export const getPrefPlace = async () => {
  const prefLocation = await getData(prefLocationKey)
    .then((response) => {
      if (response) return JSON.parse(response);
      return;
    })
    .catch((err) => {
      console.error("getPrefPlace error ", err);
    });

  return prefLocation;
};
