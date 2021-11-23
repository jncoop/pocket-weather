import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Button,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { capitalizeFirstLetter } from "../utils/CapitaliseString";
import { convertUnixDateTime } from "../utils/DateConverter";
import { StackActions } from "@react-navigation/native";

export const DetailsScreen = ({ route, navigation }) => {
  const forecast = route.params.forecast;
  const location = route.params.location;
  const date = convertUnixDateTime(forecast.dt);

  const conditionIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

  const navigateHome = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>
          {location.name + ", " + location.country}
        </Text>
        <TouchableOpacity onPress={navigateHome}>
          <Text style={styles.changeLocBtn}>Change location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{`${date.day}`}</Text>
        <Text style={styles.date}>{`${date.date} ${date.m} ${date.y}`}</Text>
      </View>
      <View style={styles.conditionContainer}>
        <View style={styles.headerContainer}>
          <Image style={styles.conditionImg} source={{ uri: conditionIcon }} />
          <View style={styles.highLowContainer}>
            <Text style={styles.highTemp}>
              {Number(forecast.temp.max).toFixed(0)} °C
            </Text>
            <Text style={styles.lowTemp}>
              {Number(forecast.temp.min).toFixed(0)} °C
            </Text>
          </View>
        </View>
        <Text style={styles.conditionText}>
          {capitalizeFirstLetter(forecast.weather[0].description)}
        </Text>
        <View style={styles.environmentContainer}>
          <View style={styles.column}>
            <View style={styles.gridCell}>
              <Text style={styles.infoText}>{forecast.humidity} %</Text>
              <Text style={styles.infoTitle}>Humidity</Text>
            </View>
            <View style={styles.gridCell}>
              <Text style={styles.infoText}>{forecast.pressure} Pa</Text>
              <Text style={styles.infoTitle}>Pressure</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.gridCell}>
              <Text style={styles.infoText}>{forecast.uvi}</Text>
              <Text style={styles.infoTitle}>UVI</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#241B3A",
  },
  locationContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    flex: 2,
    fontWeight: "700",
    fontSize: 26,
    color: "white",
  },
  changeLocBtn: {
    fontWeight: "700",
    fontSize: 14,
    color: "#FF4438",
  },
  dateContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  day: {
    fontWeight: "700",
    fontSize: 26,
    color: "white",
  },
  date: {
    fontWeight: "500",
    fontSize: 22,
    color: "white",
  },
  scroll: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  conditionContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexGrow: 2,
    padding: 16,
    backgroundColor: "#413656",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  highLowContainer: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
  },
  highTemp: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
  },
  lowTemp: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
  },
  conditionText: {
    fontWeight: "800",
    flexDirection: "row",
    fontSize: 24,
    color: "white",
    paddingLeft: 16,
    paddingRight: 16,
  },
  environmentContainer: {
    paddingTop: 32,
    flexDirection: "row",
  },
  column: {
    width: "50%",
    flexDirection: "column",
  },
  subTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: "white",
  },
  gridCell: {
    width: "90%",
    margin: "5%",
    borderRadius: 16,
    aspectRatio: 1,
    justifyContent: "center",
    backgroundColor: "#261a3c",
  },
  infoText: {
    fontWeight: "700",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  infoTitle: {
    fontWeight: "300",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  conditionImg: {
    height: 130,
    width: 130,
    flexDirection: "row",
  },
});

export default DetailsScreen;
