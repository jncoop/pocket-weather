import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import { WeeklyForecast } from "../components/WeeklyForecast";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <WeeklyForecast />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {},
  container: {},
});

export default HomeScreen;
