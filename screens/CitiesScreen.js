import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import addIcon from "../assets/add-icon.png";
import { CityCell } from "../components/CityCell";
import { getStoreItem, setStoreItem } from "../coordinators/AsyncStoreCoord";

const CitiesScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);

  const openAddCityPage = () => {
    navigation.navigate("Add city");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => openAddCityPage()}>
          <Image onPress={() => openAddCityPage()} source={addIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getCities = () => {
    getStoreItem("@savedCities")
      .then((storedCities) => {
        if (storedCities && storedCities.length > 0) {
          setCities(storedCities);
        }
      })
      .catch((error) => {
        console.error("Error getting pref location ", error);
      });
  };

  const updateCities = async () => {
    setStoreItem("@savedCities", cities).then((response) => {
      if (!response) console.error("Error updating cities ", response);
    });
  };

  const deleteCity = (city) => {
    setCities((prevState) =>
      prevState.filter((place) => place.name !== city.name)
    );
    updateCities();
  };

  useEffect(() => {
    getCities();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getCities();
    });

    return willFocusSubscription;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CityCell item={item} place={item.name} deleteCallback={deleteCity} />
        )}
        style={styles.resultsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    width: 12,
    backgroundColor: "orange",
  },
});

export default CitiesScreen;
