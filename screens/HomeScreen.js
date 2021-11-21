import { useNavigation } from "@react-navigation/native";
import React from "react";
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

const hasPrefPlace = false;

const DisplayOption = () => {
  if (hasPrefPlace) {
    return <WeeklyForecast />;
  } else {
    return <PlacePickerScreen />;
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#241B3A"
        hidden="false"
      />
      <View style={styles.container}>{DisplayOption()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {},
  container: {},
});

export default HomeScreen;
