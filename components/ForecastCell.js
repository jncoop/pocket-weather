import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import cellActiveArr from "../assets/cell-arrow-pri.png";
import { convertUnixDateTime } from "../utils/DateConverter";
import { capitalizeFirstLetter } from "../utils/CapitaliseString";

export const ForecastCell = ({ item, location, id }) => {
  const navigation = useNavigation(); // navigation hook
  const forecast = item;
  const forecastIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  const date = convertUnixDateTime(forecast.dt);

  return (
    <TouchableOpacity
      style={styles.container}
      key={id}
      onPress={() =>
        navigation.navigate("Day Forecast", {
          forecast: item,
          location: location,
        })
      }
    >
      <View style={styles.dayContainer}>
        <Image
          style={styles.detailImage}
          source={{ uri: forecastIcon }}
          resizeMode="cover"
        />
        <Text style={styles.dayText}>{`${date.day}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.tempContainer}>
          <Text style={styles.highTemp}>
            {Number(forecast.temp.max).toFixed(0)} °C /{" "}
          </Text>
          <Text style={styles.lowTemp}>
            {Number(forecast.temp.min).toFixed(0)} °C
          </Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descText}>
            {capitalizeFirstLetter(forecast.weather[0].description)}
          </Text>
        </View>
      </View>
      <Image style={styles.cellArr} source={cellActiveArr} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
    padding: 8,
    alignItems: "center",
  },

  dayContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },

  dayText: {
    fontSize: 16,
    fontWeight: "700",
  },
  detailImage: {
    width: 55,
    height: 55,
    justifyContent: "space-around",
  },
  infoContainer: {
    flexDirection: "column",
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  tempContainer: {
    flexDirection: "row",
  },
  highTemp: {
    color: "#241B3A",
    fontSize: 18,
    fontWeight: "600",
  },
  lowTemp: {
    color: "#B8B5BE",
    fontSize: 18,
    fontWeight: "600",
  },
  descContainer: {
    paddingTop: 8,
  },
  cellArr: {
    flexDirection: "column",
    marginRight: 8,
    marginLeft: 8,
  },
});
