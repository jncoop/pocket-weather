import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { API_KEY } from "../utils/OpenWeatherAPIKey";
import { ForecastCell } from "./ForecastCell";

export const WeeklyForecast = ({ location }) => {
  const [isLoading, setLoading] = useState(true);
  const [forecastData, setData] = useState([]);

  const testLocation = {
    lon: "52.2823",
    lat: "1.5249",
  };

  const getForecast = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${testLocation.lat}&lon=${testLocation.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;
    getForecast(url);
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
            <ForecastCell item={item} id={index} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
