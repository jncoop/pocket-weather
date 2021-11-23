import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Image, StatusBar } from "react-native";
import { WeeklyForecast } from "../components/WeeklyForecast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import addIcon from "../assets/add-icon.png";

const HomeScreen = ({ navigation }) => {
  const [prefLocation, setPrefLocation] = useState({});

  const getPrefLocation = () => {
    AsyncStorage.getItem("@prefLocation")
      .then((location) => {
        if (location && location.length > 0) {
          const payLoad = JSON.parse(location);
          // console.log("payLoad ", payLoad);
          setPrefLocation(payLoad);
          // console.log("prefLocation state ", prefLocation);
        }
      })
      .catch((error) => {
        console.error("Error getting pref location ", error);
      });
  };

  useEffect(() => {
    getPrefLocation();

    const willFocusSubscription = navigation.addListener("focus", () => {
      getPrefLocation();
    });

    return willFocusSubscription;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#241B3A"
        hidden="false"
      />
      <Text>{prefLocation.name}</Text>
      <WeeklyForecast location={prefLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "green",
  },
});

export default HomeScreen;
