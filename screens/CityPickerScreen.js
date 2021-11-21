import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FullButton from "../components/Button";
import { SearchPlaceCell } from "../components/SearchPlaceCell";
import { API_KEY } from "../utils/OpenWeatherAPIKey";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CityPickerScreen = ({ route, navigation }) => {
  // const navigation = useNavigation();

  if (route) console.log("place picker screen ", route.params);

  const [searchTerm, onChangeText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [placesData, setPlacesResults] = useState([]);

  const saveCities = (place) => {
    AsyncStorage.getItem("@savedCities", (err, result) => {
      if (err) return;
      if (result) {
        const updateCities = JSON.parse(result).concat(place);
        AsyncStorage.setItem("@savedCities", JSON.stringify(updateCities));
      } else {
        AsyncStorage.setItem("@savedCities", JSON.stringify([place]));
      }
    }).finally(() => {
      navigation.goBack();
    });
  };

  const getGeoCode = async (location) => {
    setLoading(true);

    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;

    try {
      const response = await fetch(geoCodeURL);
      const json = await response.json();
      setPlacesResults(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const placesResults = () => {
    if (placesData.length > 0 && searchTerm.length) {
      return (
        <View style={styles.placesContainer}>
          <Text style={styles.title}>Select location</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={placesData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SearchPlaceCell
                  place={item.name + ", " + item.country}
                  item={item}
                  callBack={saveCities}
                />
              )}
              style={styles.resultsList}
            />
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pocket Weather</Text>
          <Text style={styles.headerSubTitle}>
            The weather station in your pocker
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Find a forecast</Text>

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => {
                onChangeText(text);
                if (text.length === 0) setPlacesResults([]);
              }}
              value={searchTerm}
              placeholder={"Type your preferred location"}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FullButton
              text={"Search"}
              callBack={() => getGeoCode(searchTerm)}
            />
          </View>
        </View>
        <View style={styles.resultsContainer}>{placesResults()}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#241B3A",
    padding: 24,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerTitle: {
    flexDirection: "row",
    fontWeight: "700",
    color: "#ffffff",
    fontSize: 28,
  },
  headerSubTitle: {
    flexDirection: "row",
    color: "#ffffff",
    fontSize: 14,
  },
  inputContainer: {
    paddingBottom: 16,
  },
  title: {
    fontWeight: "800",
    fontSize: 24,
    color: "#ffffff",
    paddingTop: 16,
    paddingBottom: 16,
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
  buttonContainer: {
    paddingTop: 24,
    paddingBottom: 24,
  },

  resultsList: {
    flexShrink: 1,
  },
  resultsContainer: {
    flexDirection: "column",
    flexGrow: 1,
  },
  placesContainer: {
    flex: 4,
  },
});

export default CityPickerScreen;
