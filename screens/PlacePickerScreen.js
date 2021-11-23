import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import FullButton from "../components/Button";
import { SearchPlaceCell } from "../components/SearchPlaceCell";
import { setPrefPlace } from "../datastore/prefPlaceModel";
import { API_KEY } from "../utils/OpenWeatherAPIKey";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const PlacePickerScreen = ({ route }) => {
  const navigation = useNavigation();

  const [searchTerm, onChangeText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [placesData, setPlacesResults] = useState([]);
  const [prefPlace, setPrefPlace] = useState({});

  const navigateToForecast = (location) => {
    navigation.navigate("Forecast", { location: location });
  };

  const updatePrefLocation = async (location) => {
    setPrefPlace(location);
    await AsyncStorage.setItem("@prefLocation", JSON.stringify(location));
    navigateToForecast(location);
  };

  const getPrefLocation = () => {
    AsyncStorage.getItem("@prefLocation")
      .then((location) => {
        if (location && location.length > 0) {
          const locationJSON = JSON.parse(location);
          console.log("locationJSON ", locationJSON);
          setPrefPlace(locationJSON);
        } else {
          navigation.navigate("Place Picker");
        }
      })
      .catch((error) => {
        console.error("Error getting pref location ", error);
      });
  };

  const getGeoCode = async (location) => {
    setLoading(true);

    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;

    try {
      const response = await fetch(geoCodeURL);
      const json = await response.json();
      setPlacesResults(json);
      console.log("calling api");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const preferredPlace = () => {
    if (Object.keys(prefPlace).length !== 0 && searchTerm.length === 0) {
      return (
        <View style={styles.prefPlaceholder}>
          <Text style={styles.title}>Preferred Place</Text>
          <SearchPlaceCell
            place={prefPlace.name + ", " + prefPlace.country}
            item={prefPlace}
            callBack={navigateToForecast}
          />
        </View>
      );
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
                  callBack={updatePrefLocation}
                />
              )}
              style={styles.resultsList}
            />
          )}
        </View>
      );
    }
  };

  useEffect(() => {
    if (Object.keys(prefPlace).length === 0) getPrefLocation();

    const willFocusSubscription = navigation.addListener("focus", () => {
      getPrefLocation();
    });

    return willFocusSubscription;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#dddddd"
        hidden="false"
      />
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

        {placesData.length > 0 ? (
          <View style={styles.resultsContainer}>{placesResults()}</View>
        ) : (
          preferredPlace()
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#241B3A",
  },
  container: {
    flexDirection: "column",
    height: "100%",
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
  subTitle: {
    fontWeight: "600",
    fontSize: 20,
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

export default PlacePickerScreen;
