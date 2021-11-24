import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * returns data from asyc storage using key
 * @param {string} key - async store unique key
 * @return {object} store item object
 */
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

/**
 * sets data in async store, stored as string
 * @param {string} key - async store unique key
 * @param {object|string|number} updatedItem - item to save in store
 * @returns {boolean} - returns is set store success
 */
export const setStoreItem = async (key, updatedItem) => {
  return AsyncStorage.setItem(key, JSON.stringify(updatedItem))
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.error("setStoreItem err: ", err);
      return false;
    });
};
