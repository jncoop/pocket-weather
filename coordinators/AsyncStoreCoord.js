import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStoreItem = async (key) => {
  return AsyncStorage.getItem(key)
    .then((item) => {
      return JSON.parse(item);
    })
    .catch((err) => {
      console.error("GetStoreItem err: ", err);
      return;
    });
};

export const setStoreItem = async (key, updatedItem) => {
  return AsyncStorage.setItem(key, JSON.stringify(updatedItem))
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.error("setStoreItem err: ", err);
      return;
    });
};
