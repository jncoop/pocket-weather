import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      "@" + key,
      typeof value === "object" ? JSON.stringify(value) : value
    );
  } catch (e) {
    console.error("Error setting value ", e);
  }
};

export const getData = async (key) => {
  try {
    const jsonData = await AsyncStorage.getItem("@" + key);
    if (jsonData) {
      if (typeof jsonData === "object") return JSON.parse(jsonData);
      return jsonData;
    }
  } catch (e) {
    console.error("Error getting data ", e);
  }
};

export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem("@" + key);
  } catch (e) {
    // remove error
    console.error("Error deleting data ", e);
  }
};
