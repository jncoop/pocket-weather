import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { getPrefPlace } from "../datastore/prefPlaceModel";
import { API_KEY } from "../utils/OpenWeatherAPIKey";
import { ForecastCell } from "./ForecastCell";
export const WeeklyForecast = () => {
  const tempLat = "52.2823";
  const tempLong = "1.5849";

  const [isLoading, setLoading] = useState(true);
  const [forecastData, setData] = useState([]);
  const [prefPlace, setPrefPlace] = useState({});

  const getForecast = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      console.log("response data ", json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const returnPrefPlace = async () => {
    let response = await getPrefPlace();
    console.log("getPrefPlace ", response);
    if (response) {
      console.log("res 2 ", response);
      setPrefPlace(response);
      console.log("set pref response ", response);
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&exclude=minutely,hourly&appid=${API_KEY}`;
      getForecast(url);
    }
  };

  useEffect(() => {
    console.log("useEffect call ", prefPlace);

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLong}&exclude=minutely,hourly&appid=${API_KEY}`;
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
