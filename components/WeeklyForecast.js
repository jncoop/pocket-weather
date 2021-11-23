import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { API_KEY } from "../utils/OpenWeatherAPIKey";
import { ForecastCell } from "./ForecastCell";

export const WeeklyForecast = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [forecastData, setData] = useState([]);
  const [forecastLocation, setLocation] = useState("");

  // console.log("route navigation ", route, navigation);
  const location = route.params.location;
  // const navigation = useNavigation();

  // const testLocation = {
  //   lat: "52.2823",
  //   lon: "-1.5249",
  // };

  const getForecast = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      console.log("weather json ", json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const willFocusSubscription = navigation.addListener("focus", () => {
    //   console.log("weather forecast focus, ", location);
    // });

    // return willFocusSubscription;

    setLocation(location);
    console.log("Weekly Forecase Location ", location);

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;
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
