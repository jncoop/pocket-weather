import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, FlatList } from "react-native";
import { fetchForecast } from "../coordinators/WeatherApiCoord";
import { ForecastCell } from "./ForecastCell";

export const WeeklyForecast = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [forecastData, setData] = useState([]);

  const location = route.params.location;

  const getForecast = () => {
    fetchForecast(location)
      .then((jsonResponse) => {
        setData(jsonResponse);
        if (jsonResponse.length === 0)
          showAlert("Week Forecast", "Error retrieving weather forecast");
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
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
