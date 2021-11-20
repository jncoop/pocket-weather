import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { API_KEY } from "../utils/OpenWeatherAPIKey";
export const WeeklyForecast = () => {
  const tempLat = "52.2823";
  const tempLong = "1.5849";

  const [isLoading, setLoading] = useState(true);
  const [forecastData, setData] = useState([]);

  const testURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLong}&exclude=minutely,hourly&appid=${API_KEY}`;

  const getForecast = async () => {
    try {
      const response = await fetch(testURL);
      const json = await response.json();
      setData(json);
      console.log("response data ", json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("testURL ", testURL);
    getForecast();
  }, []);

  return (
    <View style={{ padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={forecastData.daily}
          keyExtractor={(item) => item.dt}
          renderItem={({ item }) => <Text>{item.clouds}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 14,
  },
});
