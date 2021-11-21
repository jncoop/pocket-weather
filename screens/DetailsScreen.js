import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { convertUnixDateTime } from "../utils/DateConverter";

export const DetailsScreen = ({ route, navigation }) => {
  const forecast = route.params.forecast;
  const date = convertUnixDateTime(forecast.dt);

  useEffect(() => {
    console.log("state forecast ", forecast);
    console.log("converted date ", date);
  }, []);

  return (
    <SafeAreaView styles={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}> Details Screen</Text>

          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {`${date.day} ${date.date} ${date.m} ${date.y}`}
            </Text>
          </View>

          <View style={styles.conditionContainer}>
            <View style={styles.tempContainer}></View>
            <View style={styles.descriptionContainer}></View>
            <View style={styles.environmentContainer}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default DetailsScreen;
