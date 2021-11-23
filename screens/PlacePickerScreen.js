import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Keyboard,
} from "react-native";
import FullButton from "../components/Button";
import { SearchPlaceCell } from "../components/SearchPlaceCell";
import { getStoreItem, setStoreItem } from "../coordinators/AsyncStoreCoord";
import { fetchGeoCode } from "../coordinators/WeatherApiCoord";
import { showAlert } from "../utils/Alert";

export const PlacePickerScreen = ({ route, navigation }) => {
  const [searchTerm, onChangeText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [placesData, setPlacesResults] = useState([]);
  const [prefPlace, setPrefPlace] = useState({});

  const navigateToForecast = (location) => {
    navigation.navigate("Forecast", { location: location });
  };

  const updatePrefLocation = async (location) => {
    setPrefPlace(location);

    setStoreItem("@prefLocation", location).then((response) => {
      if (!response)
        console.error("Error updating preffered location ", response);
      navigateToForecast(location);
    });
  };

  const getPrefLocation = () => {
    getStoreItem("@prefLocation")
      .then((location) => {
        if (location && location.length > 0) {
          setPrefPlace(location);
        }
      })
      .catch((error) => {
        console.error("Error getting pref location ", error);
      });
  };

  const getGeoCode = (location) => {
    Keyboard.dismiss();

    setLoading(true);

    fetchGeoCode(location)
      .then((jsonResponse) => {
        setPlacesResults(jsonResponse);
        if (jsonResponse.length === 0)
          showAlert("City Search", "No results found, please try again");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const preferredPlace = () => {
    if (Object.keys(prefPlace).length !== 0 && searchTerm.length === 0) {
      return (
        <View style={styles.prefPlaceholder}>
          <Text style={styles.subTitle}>Preferred Place</Text>
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
      <StatusBar barStyle="light-content" backgroundColor="#241B3A" />
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
