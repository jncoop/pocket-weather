import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, FlatList } from "react-native";
import { fetchForecast } from "../coordinators/weather-api-coord";
import { ForecastCell } from "./ForecastCell";

export const WeeklyForecast = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [forecastData, setData] = useState([]);

  const location = route.params.location;

  const getForecast = () => {
    fetchForecast(location)
      .then((jsonResponse) => {
        setData(jsonResponse);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={forecastData.daily}
          keyExtractor={(item) => item.dt}
          renderItem={({ item, index }) => (
            <ForecastCell item={item} location={location} id={index} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#F5F8FA",
    borderRadius: 4,
    alignItems: "center",
  },
  searchInput: {
    width: "90%",
    padding: 16,
  },
});
