import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";
import FullButton from "../components/Button";
import { SearchPlaceCell } from "../components/SearchPlaceCell";
import { getStoreItem, setStoreItem } from "../coordinators/AsyncStoreCoord";
import { fetchGeoCode } from "../coordinators/WeatherApiCoord";
import { showAlert } from "../utils/Alert";

export const CityPickerScreen = ({ route }) => {
  const navigation = useNavigation();

  const [searchTerm, onChangeText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [citiesData, setcitiesResults] = useState([]);

  //saves passed city to cities store
  const saveCities = (city) => {
    getStoreItem("@savedCities")
      .then((result) => {
        if (result && result.length > 0) {
          return result.concat(city);
        } else {
          return [city];
        }
      })
      .then((citiesArr) => {
        setStoreItem("@savedCities", citiesArr).then((res) => {
          if (!res) throw "Error setting cities";
        });
      })
      .catch((error) => {
        console.error("Error saving cities: ", error);
      })
      .finally(() => {
        navigation.goBack();
      });
  };

  //returns geo-location object for location name
  const getGeoCode = (location) => {
    Keyboard.dismiss();

    setLoading(true);

    fetchGeoCode(location)
      .then((jsonResponse) => {
        setcitiesResults(jsonResponse);
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

  //returns results from geo-location search
  const citiesResults = () => {
    if (citiesData.length > 0 && searchTerm.length) {
      return (
        <View style={styles.cityContainer}>
          <Text style={styles.title}>Select location</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={citiesData}
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
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Select a city</Text>

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => {
                onChangeText(text);
                if (text.length === 0) setcitiesResults([]);
              }}
              value={searchTerm}
              placeholder={"Search your favourite cities"}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FullButton
              text={"Search"}
              callBack={() => getGeoCode(searchTerm)}
            />
          </View>
        </View>
        <View style={styles.resultsContainer}>{citiesResults()}</View>
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
  cityContainer: {
    flex: 4,
  },
});

export default CityPickerScreen;
