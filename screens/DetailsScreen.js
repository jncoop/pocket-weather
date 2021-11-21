import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { capitalizeFirstLetter } from "../utils/CapitaliseString";
import { convertUnixDateTime } from "../utils/DateConverter";

export const DetailsScreen = ({ route, navigation }) => {
  const forecast = route.params.forecast;
  const date = convertUnixDateTime(forecast.dt);

  const conditionIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  console.log("conditionIcon ", conditionIcon);
  useEffect(() => {
    console.log("state forecast ", forecast);
    console.log("converted date ", date);
  }, []);

  return (
    <SafeAreaView styles={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {`${date.day} ${date.date} ${date.m} ${date.y}`}
            </Text>
          </View>

          <View style={styles.conditionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subTitle}>Conditions</Text>
              <Image
                style={styles.conditionImg}
                source={{ uri: conditionIcon }}
              />
              <Text style={styles.infoText}>
                {capitalizeFirstLetter(forecast.weather[0].description)}
              </Text>
            </View>
            <View style={styles.tempContainer}>
              <Text style={styles.subTitle}>Temperature</Text>
              <Text style={styles.infoText}>
                Morning: {forecast.temp.morn} °C
              </Text>
              <Text style={styles.infoText}>Day: {forecast.temp.day} °C</Text>
              <Text style={styles.infoText}>Eve: {forecast.temp.eve} °C</Text>
              <Text style={styles.infoText}>
                Night: {forecast.temp.night} °C
              </Text>
            </View>
            <View style={styles.environmentContainer}>
              <Text style={styles.infoText}>
                Humidity: {forecast.humidity} %
              </Text>
              <Text style={styles.infoText}>
                Pressure: {forecast.pressure} Pa
              </Text>
              <Text style={styles.infoText}>UVI: {forecast.uvi}</Text>
            </View>
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

  conditionImg: {
    height: 130,
    width: 130,
  },
});

export default DetailsScreen;
