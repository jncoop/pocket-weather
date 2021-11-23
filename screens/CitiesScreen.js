import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import addIcon from "../assets/add-icon.png";
import { CityCell } from "../components/CityCell";

const CitiesScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);

  const openAddCityPage = () => {
    navigation.navigate("City Picker");
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
    AsyncStorage.getItem("@savedCities").then((storedCities) => {
      console.log("stored cities ", storedCities);
      setCities(JSON.parse(storedCities));
    });
  };

  const updateCities = async () => {
    AsyncStorage.setItem("@savedCities", JSON.stringify(cities));
  };

  const deleteCity = (city) => {
    console.log("delete city ", city, cities);
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
