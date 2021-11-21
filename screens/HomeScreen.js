import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Button,
  FocusAwareStatusBar,
} from "react-native";
import { PlacePickerScreen } from "../screens/PlacePickerScreen";
import { WeeklyForecast } from "../components/WeeklyForecast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FullButton from "../components/Button";

const hasPrefPlace = false;

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isPrefLocSet, setIsPrefLocSet] = useState(false);
  const [prefLocation, setPrefLocation] = useState({});

  const getPrefLocation = () => {
    AsyncStorage.getItem("@prefLocation")
      .then((location) => {
        if (location && location.length > 0) {
          setIsPrefLocSet(true);
          setPrefLocation(JSON.parse(location)[0]);
        } else {
          navigation.navigate("Place Picker");
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#241B3A"
        hidden="false"
      />
      <View>
        <WeeklyForecast location={prefLocation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {},
  container: {},
});

export default HomeScreen;
