import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value, key);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("Error when store data", JSON.stringify(e));
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue);
  } catch (e) {
    console.log("Error when get data");
  }
};
